import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type CSSProperties,
} from 'react';
import { Controls } from './Controls';
import { HistoryChart } from './HistoryChart';

type HistoryPoint = { generation: number; alive: number };

type Props = {
  generation: number;
  aliveCount: number;
  history: HistoryPoint[];
  running: boolean;
  onToggleRunning: () => void;
  onStep: () => void;
  onRandomize: () => void;
  onClear: () => void;
  speed: number;
  onSpeedChange: (val: number) => void;
  density: number;
  onDensityChange: (val: number) => void;
};

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const snapCorner = (x: number, y: number): Corner => {
  const vert = y < window.innerHeight / 2 ? 'top' : 'bottom';
  const horiz = x < window.innerWidth / 2 ? 'left' : 'right';
  return `${vert}-${horiz}` as Corner;
};
const APP_VERSION = __APP_VERSION__;

export function HudCard({
  generation,
  aliveCount,
  history,
  running,
  onToggleRunning,
  onStep,
  onRandomize,
  onClear,
  speed,
  onSpeedChange,
  density,
  onDensityChange,
}: Props) {
  const hudRef = useRef<HTMLDivElement | null>(null);
  const hudSizeRef = useRef({ width: 0, height: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const dragPointerIdRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const pointerUpHandlerRef = useRef<((event: PointerEvent) => void) | null>(null);
  const pointerCancelHandlerRef = useRef<((event: PointerEvent) => void) | null>(null);
  const [corner, setCorner] = useState<Corner>('top-left');
  const [dragging, setDragging] = useState(false);
  const [floatingPos, setFloatingPos] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const edgeInset = isMobile ? 12 : 18;
  const canDrag = !isMobile;

  const handlePointerMove = useCallback(
    (event: PointerEvent | ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current || dragPointerIdRef.current !== event.pointerId) return;
      const margin = edgeInset + 4;
      const { width, height } = hudSizeRef.current;
      const nextX = event.clientX - dragOffsetRef.current.x;
      const nextY = event.clientY - dragOffsetRef.current.y;
      const clampedX = Math.min(Math.max(nextX, margin), window.innerWidth - width - margin);
      const clampedY = Math.min(Math.max(nextY, margin), window.innerHeight - height - margin);
      setFloatingPos({ x: clampedX, y: clampedY });
    },
    [edgeInset]
  );

  const endDrag = useCallback(
    (event?: PointerEvent | ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      dragPointerIdRef.current = null;
      if (event) {
        const rect = hudRef.current?.getBoundingClientRect();
        const centerX = rect ? rect.left + rect.width / 2 : event.clientX;
        const centerY = rect ? rect.top + rect.height / 2 : event.clientY;
        setCorner(snapCorner(centerX, centerY));
      }
      setFloatingPos(null);
      window.removeEventListener('pointermove', handlePointerMove);
      if (pointerUpHandlerRef.current) {
        window.removeEventListener('pointerup', pointerUpHandlerRef.current);
      }
      if (pointerCancelHandlerRef.current) {
        window.removeEventListener('pointercancel', pointerCancelHandlerRef.current);
      }
      pointerUpHandlerRef.current = null;
      pointerCancelHandlerRef.current = null;
    },
    [handlePointerMove]
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!canDrag) return;
      const target = event.target as HTMLElement;
      if (target.closest('button, input, a, label')) return;
      const rect = hudRef.current?.getBoundingClientRect();
      if (!rect) return;
      event.preventDefault();
      dragPointerIdRef.current = event.pointerId;
      dragOffsetRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      hudSizeRef.current = { width: rect.width, height: rect.height };
      draggingRef.current = true;
      setDragging(true);
      setFloatingPos({ x: rect.left, y: rect.top });
      window.addEventListener('pointermove', handlePointerMove);
      pointerUpHandlerRef.current = (ev: PointerEvent) => endDrag(ev);
      pointerCancelHandlerRef.current = (ev: PointerEvent) => endDrag(ev);
      window.addEventListener('pointerup', pointerUpHandlerRef.current);
      window.addEventListener('pointercancel', pointerCancelHandlerRef.current);
    },
    [canDrag, endDrag, handlePointerMove]
  );

  useEffect(() => {
    return () => endDrag();
  }, [endDrag]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const cornerStyles = useMemo<Record<Corner, CSSProperties>>(() => {
    const insetFor = (axis: 'top' | 'right' | 'bottom' | 'left') =>
      `calc(${edgeInset}px + env(safe-area-inset-${axis}, 0px))`;
    return {
      'top-left': { top: insetFor('top'), left: insetFor('left'), right: 'auto', bottom: 'auto' },
      'top-right': { top: insetFor('top'), right: insetFor('right'), left: 'auto', bottom: 'auto' },
      'bottom-left': {
        bottom: insetFor('bottom'),
        left: insetFor('left'),
        right: 'auto',
        top: 'auto',
      },
      'bottom-right': {
        bottom: insetFor('bottom'),
        right: insetFor('right'),
        left: 'auto',
        top: 'auto',
      },
    };
  }, [edgeInset]);

  const hudStyle = useMemo<CSSProperties>(() => {
    if (dragging && floatingPos) {
      return { top: floatingPos.y, left: floatingPos.x };
    }
    return cornerStyles[corner];
  }, [corner, cornerStyles, dragging, floatingPos]);

  const cardClassName = useMemo(
    () =>
      `absolute z-10 grid w-[min(92vw,760px)] md:w-[min(48vw,820px)] gap-3 rounded-2xl border border-base-300/60 bg-base-200/80 p-5 shadow-2xl backdrop-blur-md select-none ${
        dragging ? 'transition-none' : 'transition-[top,right,bottom,left] duration-200 ease-out'
      }`,
    [dragging]
  );

  const cardStyle = useMemo(() => {
    const cursor = canDrag ? (dragging ? 'grabbing' : 'grab') : 'default';
    const touchAction = canDrag ? 'none' : 'auto';
    return { ...hudStyle, touchAction, cursor };
  }, [canDrag, dragging, hudStyle]);

  return (
    <div className={cardClassName} ref={hudRef} style={cardStyle} onPointerDown={handlePointerDown}>
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Infinite Game of Life</h1>
          <p className="max-w-xl text-sm text-[color:var(--text-muted)]">
            Pause to paint, pan/zoom to explore, and resume to watch the patterns ripple across an
            unbounded grid.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-100/60 px-3 py-1 text-xs font-semibold text-[color:var(--text-primary)] shadow"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? 'Collapse' : 'Expand'}
          </button>
          <span className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-100/60 px-3 py-1 text-xs font-semibold text-[color:var(--text-primary)] shadow">
            v{APP_VERSION}
          </span>
        </div>
      </header>

      <div className={isOpen ? 'grid gap-3' : 'hidden'} aria-hidden={!isOpen}>
        <HistoryChart history={history} generation={generation} alive={aliveCount} />

        <Controls
          running={running}
          onToggleRunning={onToggleRunning}
          onStep={onStep}
          onRandomize={onRandomize}
          onClear={onClear}
          speed={speed}
          onSpeedChange={onSpeedChange}
          density={density}
          onDensityChange={onDensityChange}
        />

        <div className="text-sm text-[color:var(--text-subtle)] space-y-1">
          <p className="font-semibold text-[color:var(--text-muted)]">Rules</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>Any live cell with fewer than two live neighbors dies (underpopulation).</li>
            <li>Any live cell with two or three live neighbors lives on.</li>
            <li>Any live cell with more than three live neighbors dies (overpopulation).</li>
            <li>
              Any dead cell with exactly three live neighbors becomes a live cell (reproduction).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
