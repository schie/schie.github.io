type Props = {
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

export function Controls({
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
  return (
    <div className="grid gap-3 rounded-xl border border-base-300/60 bg-base-100/60 p-3 shadow">
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={onToggleRunning}>
          {running ? 'Pause' : 'Resume'}
        </button>
        <button className="btn" onClick={onStep} disabled={running}>
          Step
        </button>
        <button className="btn btn-secondary" onClick={onRandomize}>
          Randomize
        </button>
        <button className="btn btn-outline" onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="grid gap-3">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Speed</span>
            <span className="label-text-alt text-cyan-300">{speed} ms</span>
          </div>
          <input
            type="range"
            min={60}
            max={600}
            step={20}
            value={speed}
            onChange={(event) => onSpeedChange(Number(event.target.value))}
            className="range range-primary"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Seed density</span>
            <span className="label-text-alt text-cyan-300">{Math.round(density * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.05}
            max={0.7}
            step={0.05}
            value={density}
            onChange={(event) => onDensityChange(Number(event.target.value))}
            className="range range-accent"
          />
        </label>
      </div>
    </div>
  );
}
