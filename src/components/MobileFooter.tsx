import { useEffect, useRef, useState } from "react";
import profilePic from "../assets/profile.jpeg";

type MobileFooterProps = {
  isVisible: boolean;
};

export function MobileFooter({ isVisible }: MobileFooterProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      setShouldRender(true);
      return;
    }

    hideTimerRef.current = window.setTimeout(() => {
      setShouldRender(false);
      hideTimerRef.current = null;
    }, 300);

    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [isVisible]);

  if (!shouldRender) {
    return null;
  }

  const wrapperClass = `fixed inset-x-4 bottom-4 z-30 sm:hidden transition duration-300 ease-out ${
    isVisible
      ? "pointer-events-auto opacity-100 translate-y-0"
      : "pointer-events-none opacity-0 translate-y-3"
  }`;
  const linkTabIndex = isVisible ? 0 : -1;

  return (
    <div className={wrapperClass} aria-hidden={!isVisible}>
      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-base-300/70 bg-base-100/80 px-3 py-2 shadow-lg backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="h-10 w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <img src={profilePic} alt="Portrait of Dustin Schie" />
            </div>
          </div>
          <div className="text-sm font-semibold leading-tight">
            Dustin Schie
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            className="btn btn-sm btn-circle btn-neutral shadow shadow-neutral"
            href="https://github.com/schie"
            target="_blank"
            rel="noreferrer"
            tabIndex={linkTabIndex}
            aria-label="GitHub"
            title="GitHub"
          >
            <i className="fa-brands fa-github text-lg" aria-hidden="true" />
          </a>
          <a
            className="btn btn-sm btn-circle btn-accent shadow shadow-accent"
            href="https://www.linkedin.com/in/dustin-schie-9431945b"
            target="_blank"
            rel="noreferrer"
            tabIndex={linkTabIndex}
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <i
              className="fa-brands fa-linkedin-in text-lg"
              aria-hidden="true"
            />
          </a>
          <a
            className="btn btn-sm btn-circle btn-info shadow shadow-info"
            href="https://bsky.app/profile/schie.io"
            target="_blank"
            rel="noreferrer"
            tabIndex={linkTabIndex}
            aria-label="Bluesky"
            title="Bluesky"
          >
            <i className="fa-brands fa-bluesky text-lg" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
