import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = (event?: MediaQueryListEvent) => {
      setTheme((event?.matches ?? matcher.matches) ? 'dark' : 'light');
    };
    syncTheme();
    matcher.addEventListener('change', syncTheme);
    return () => matcher.removeEventListener('change', syncTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('color-scheme', theme);
  }, [theme]);

  return theme;
};
