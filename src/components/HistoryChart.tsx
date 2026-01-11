import * as d3 from 'd3';

type Point = { generation: number; alive: number };

type Props = {
  history: Point[];
  generation: number;
  alive: number;
  width?: number;
  height?: number;
  pad?: number;
};

export function HistoryChart({
  history,
  generation,
  alive,
  width = 420,
  height = 140,
  pad = 10,
}: Props) {
  const buildPath = (data: Point[], accessor: (d: Point) => number) => {
    if (data.length < 2) return '';
    const startGen = data[0].generation;
    const endGen = data[data.length - 1].generation;
    const safeEnd = endGen === startGen ? startGen + 1 : endGen;
    const xScale = d3.scaleLinear().domain([startGen, safeEnd]).range([pad, width - pad]);
    const maxY = Math.max(1, ...data.map((d) => accessor(d)));
    const yScale = d3.scaleLinear().domain([0, maxY]).range([height - pad, pad]);
    return (
      d3
        .line<Point>()
        .x((d) => xScale(d.generation))
        .y((d) => yScale(accessor(d)))(data) ?? ''
    );
  };

  const alivePath = buildPath(history, (d) => d.alive);
  const genPath = buildPath(history, (d) => d.generation);

  return (
    <div className="rounded-xl border border-base-300/60 bg-base-100/60 p-3 shadow">
      <div className="flex items-center justify-between text-sm text-[color:var(--text-muted)]">
        <span>History (last {history.length} steps)</span>
        <span className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Alive
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            Generation
          </span>
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 h-36 w-full">
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={10}
          className="fill-base-200/60 stroke-base-300/60"
        />
        <path d={genPath} fill="none" stroke="#fbbf24" strokeWidth={2} />
        <path d={alivePath} fill="none" stroke="#22d3ee" strokeWidth={2} />
        {history.length > 0 && (
          <text x={pad} y={pad + 10} className="fill-[color:var(--text-subtle)] text-[10px]">
            {`Gen ${generation.toLocaleString()} — Alive ${alive.toLocaleString()}`}
          </text>
        )}
      </svg>
    </div>
  );
}
