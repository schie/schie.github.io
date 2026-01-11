import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type LifeBoardContextValue = {
  running: boolean;
  toggleRunning: () => void;
  requestRandomize: () => void;
  randomizeToken: number;
};

const LifeBoardContext = createContext<LifeBoardContextValue | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export function LifeBoardProvider({ children }: ProviderProps) {
  const [running, setRunning] = useState(true);
  const [randomizeToken, setRandomizeToken] = useState(0);

  const toggleRunning = useCallback(() => {
    setRunning((prev) => !prev);
  }, []);

  const requestRandomize = useCallback(() => {
    setRandomizeToken((prev) => prev + 1);
  }, []);

  const value = useMemo(
    () => ({
      running,
      toggleRunning,
      requestRandomize,
      randomizeToken,
    }),
    [running, toggleRunning, requestRandomize, randomizeToken],
  );

  return <LifeBoardContext.Provider value={value}>{children}</LifeBoardContext.Provider>;
}

export function useLifeBoardControls() {
  const context = useContext(LifeBoardContext);
  if (!context) {
    throw new Error('useLifeBoardControls must be used within LifeBoardProvider');
  }
  return context;
}
