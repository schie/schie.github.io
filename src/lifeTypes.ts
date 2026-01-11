export type LiveCell = { x: number; y: number };

export type WorkerMessage =
  | { type: 'init'; payload: { density: number; bounds?: Bounds } }
  | { type: 'step' }
  | { type: 'randomize'; payload: { density: number; bounds?: Bounds } }
  | { type: 'clear' }
  | { type: 'toggle'; payload: { row: number; col: number } }
  | { type: 'paint'; payload: { row: number; col: number; value: 0 | 1 } };

export type WorkerResponse = {
  type: 'state';
  cells: LiveCell[];
  generation: number;
  alive: number;
};

export const CELL_SIZE = 14;

export type Bounds = {
  minCol: number;
  maxCol: number;
  minRow: number;
  maxRow: number;
};
