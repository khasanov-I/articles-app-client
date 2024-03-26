import {type Theme} from '@/shared/const/theme';
import {createContext} from 'react';

type ContextType = {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
};

export const ThemeContext = createContext<ContextType>({});
