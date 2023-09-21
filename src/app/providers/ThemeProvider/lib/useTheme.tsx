import { useContext } from 'react';
import { LOCAL_STORAGE_THEME, Theme, ThemeContext } from './ThemeContext';

interface ThemeType {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): ThemeType {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME, newTheme);
  }

  return { theme, toggleTheme };
}
