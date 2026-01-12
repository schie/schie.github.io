import { useLifeBoardControls } from "../contexts/LifeBoardContext";

export function LifeBoardControls() {
  const { running, toggleRunning, requestRandomize } = useLifeBoardControls();

  return (
    <div className="absolute bottom-4 right-4 z-20 flex gap-2 rounded-2xl border border-base-300/60 bg-base-100/80 p-2 shadow-lg backdrop-blur pointer-events-auto">
      <button
        type="button"
        className="btn btn-primary btn-sm btn-square"
        onClick={toggleRunning}
      >
        {running ? "⏸️" : "▶️"}
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-sm btn-circle"
        onClick={requestRandomize}
      >
        🔀
      </button>
    </div>
  );
}
