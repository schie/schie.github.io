/// <reference lib="webworker" />
import { type Bounds, type LiveCell, type WorkerMessage, type WorkerResponse } from './lifeTypes';

type Key = string;

const neighborOffsets = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;

const keyFor = (x: number, y: number): Key => `${x},${y}`;
const fromKey = (key: Key): LiveCell => {
  const [x, y] = key.split(',').map((n) => Number(n));
  return { x, y };
};

const randomize = (density: number, bounds?: Bounds): Set<Key> => {
  const live = new Set<Key>();
  const range =
    bounds ?? { minCol: -80, maxCol: 80, minRow: -80, maxRow: 80 }; // fallback
  const width = range.maxCol - range.minCol;
  const height = range.maxRow - range.minRow;
  const total = Math.max(0, Math.floor(width * height * density));
  for (let i = 0; i < total; i += 1) {
    const x = Math.floor(Math.random() * width) + range.minCol;
    const y = Math.floor(Math.random() * height) + range.minRow;
    live.add(keyFor(x, y));
  }
  return live;
};

const step = (live: Set<Key>): Set<Key> => {
  const neighborCounts = new Map<Key, number>();

  for (const key of live) {
    const { x, y } = fromKey(key);
    for (const [dy, dx] of neighborOffsets) {
      const neighborKey = keyFor(x + dx, y + dy);
      neighborCounts.set(neighborKey, (neighborCounts.get(neighborKey) ?? 0) + 1);
    }
  }

  const next = new Set<Key>();
  for (const [key, count] of neighborCounts.entries()) {
    if (count === 3 || (count === 2 && live.has(key))) {
      next.add(key);
    }
  }

  return next;
};

const postState = (live: Set<Key>, generation: number) => {
  const cells: LiveCell[] = Array.from(live.values()).map((k) => fromKey(k));
  const message: WorkerResponse = {
    type: 'state',
    cells,
    generation,
    alive: live.size,
  };
  postMessage(message);
};

let liveCells: Set<Key> = randomize(0.7);
let generation = 0;

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const message = event.data;

  switch (message.type) {
    case 'init': {
      liveCells = randomize(message.payload.density, message.payload.bounds);
      generation = 0;
      postState(liveCells, generation);
      break;
    }
    case 'step': {
      liveCells = step(liveCells);
      generation += 1;
      postState(liveCells, generation);
      break;
    }
    case 'randomize': {
      liveCells = randomize(message.payload.density, message.payload.bounds);
      generation = 0;
      postState(liveCells, generation);
      break;
    }
    case 'clear': {
      liveCells = new Set<Key>();
      generation = 0;
      postState(liveCells, generation);
      break;
    }
    case 'toggle': {
      const { row, col } = message.payload;
      const k = keyFor(col, row);
      if (liveCells.has(k)) {
        liveCells.delete(k);
      } else {
        liveCells.add(k);
      }
      postState(liveCells, generation);
      break;
    }
    case 'paint': {
      const { row, col, value } = message.payload;
      const k = keyFor(col, row);
      if (value === 1) {
        liveCells.add(k);
      } else {
        liveCells.delete(k);
      }
      postState(liveCells, generation);
      break;
    }
    default:
      break;
  }
};

// Kick off with the initial state so the main thread can paint immediately.
postState(liveCells, generation);

export {}; // keep this a module
