import { createContext, useState } from 'react';

export const LOCAL_STORAGE_THEME = 'theme';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ContextProps {
  theme?: Theme;
  setTheme?: (e: Theme) => void;
}

export const ThemeContext = createContext<ContextProps>({});
