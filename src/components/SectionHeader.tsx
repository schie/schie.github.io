import { useEffect, useMemo, useRef, useState } from "react";
import profilePic from "../assets/profile.jpeg";

type SectionHeaderProps = {
  id: string;
  title: string;
  description?: string;
};

export function SectionHeader({ id, title, description }: SectionHeaderProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const root = sentinel.closest("[data-scroll-container]");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { root, threshold: 0 }
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, []);

  const stickyClass = useMemo(
    () =>
      `sticky top-0 z-10 rounded-2xl border-2 bg-base-100/70 py-2 text-center backdrop-blur transition duration-300 ease-out sm:py-3 ${
        isStuck
          ? "border-primary shadow-lg shadow-primary"
          : "border-transparent shadow-none"
      }`,
    [isStuck]
  );

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />
      <div className={stickyClass}>
        <div className="grid w-full grid-cols-1 items-center gap-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-3">
          <div className="hidden w-20 flex-col items-center justify-center sm:flex">
            <div
              className={`avatar px-2 transition duration-300 ease-out ${
                isStuck ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="h-10 w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <img src={profilePic} alt="Portrait of Dustin Schie" />
              </div>
            </div>
            <span
              className={`text-xs text-base-content/60 transition duration-300 ease-out py-2 ${
                isStuck
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1"
              }`}
            >
              Dustin Schie
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
              <a
                className="underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                href={`#${id}`}
              >
                {title}
              </a>
            </h2>
            {description ? (
              <p className="text-xs text-base-content/70 sm:text-sm">
                {description}
              </p>
            ) : null}
          </div>
          <div className="hidden w-20 sm:block" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
