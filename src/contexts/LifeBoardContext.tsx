import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type LifeBoardContextValue = {
  running: boolean;
  toggleRunning: () => void;
  requestRandomize: () => void;
  randomizeToken: number;
  isForegroundVisible: boolean;
  toggleForegroundVisibility: () => void;
};

const LifeBoardContext = createContext<LifeBoardContextValue | undefined>(
  undefined
);

type ProviderProps = {
  children: ReactNode;
};

export function LifeBoardProvider({ children }: ProviderProps) {
  const [running, setRunning] = useState(true);
  const [randomizeToken, setRandomizeToken] = useState(0);
  const [isForegroundVisible, setIsForegroundVisible] = useState(true);
  const resumeOnVisibleRef = useRef(false);

  const toggleRunning = useCallback(() => {
    setRunning((prev) => !prev);
  }, []);

  const requestRandomize = useCallback(() => {
    setRandomizeToken((prev) => prev + 1);
  }, []);

  const toggleForegroundVisibility = useCallback(() => {
    setIsForegroundVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        resumeOnVisibleRef.current = running;
        if (running) {
          setRunning(false);
        }
        return;
      }

      if (resumeOnVisibleRef.current) {
        setRunning(true);
        resumeOnVisibleRef.current = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [running]);

  const value = useMemo(
    () => ({
      running,
      toggleRunning,
      requestRandomize,
      randomizeToken,
      isForegroundVisible,
      toggleForegroundVisibility,
    }),
    [
      running,
      toggleRunning,
      requestRandomize,
      randomizeToken,
      isForegroundVisible,
      toggleForegroundVisibility,
    ]
  );

  return (
    <LifeBoardContext.Provider value={value}>
      {children}
    </LifeBoardContext.Provider>
  );
}

export function useLifeBoardControls() {
  const context = useContext(LifeBoardContext);
  if (!context) {
    throw new Error(
      "useLifeBoardControls must be used within LifeBoardProvider"
    );
  }
  return context;
}
