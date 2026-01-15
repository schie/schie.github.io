import { useLifeBoardControls } from "../contexts/LifeBoardContext";

type LifeBoardControlsProps = {
  isMobileFooterVisible: boolean;
};

export function LifeBoardControls({
  isMobileFooterVisible,
}: LifeBoardControlsProps) {
  const {
    running,
    toggleRunning,
    requestRandomize,
    isForegroundVisible,
    toggleForegroundVisibility,
  } = useLifeBoardControls();

  return (
    <div
      className={`absolute bottom-4 right-4 z-20 flex gap-2 rounded-2xl border border-base-300/60 bg-base-100/80 p-2 shadow-lg backdrop-blur pointer-events-auto transition-transform duration-300 ease-out ${
        isMobileFooterVisible ? "-translate-y-16" : "translate-y-0"
      }`}
    >
      <button
        type="button"
        className="btn btn-primary btn-sm btn-ghost"
        onClick={toggleRunning}
        aria-label={running ? "Pause animation" : "Play animation"}
      >
        <i
          className={`fa-solid text-lg ${running ? "fa-pause" : "fa-play"}`}
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-sm btn-ghost"
        onClick={requestRandomize}
        aria-label="Shuffle pattern"
      >
        <i className="fa-solid fa-shuffle text-lg" aria-hidden="true" />
      </button>
      <label className="swap swap-rotate btn btn-accent btn-sm btn-ghost">
        <input
          type="checkbox"
          checked={isForegroundVisible}
          onChange={toggleForegroundVisibility}
          aria-label={
            isForegroundVisible ? "Hide foreground" : "Show foreground"
          }
        />
        <i className="swap-off fa-solid fa-eye text-lg" aria-hidden="true" />
        <i
          className="swap-on fa-solid fa-eye-slash text-lg"
          aria-hidden="true"
        />
      </label>
    </div>
  );
}
