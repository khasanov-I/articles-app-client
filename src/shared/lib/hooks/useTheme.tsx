import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {LOCAL_STORAGE_THEME} from '@/shared/const/localStorage';
import {Theme} from '@/shared/const/theme';

type ThemeType = {
    theme: Theme;
    toggleTheme: () => void;
};

export function useTheme(): ThemeType {
    const {theme = Theme.DARK, setTheme} = useContext(ThemeContext);

    function toggleTheme() {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME, newTheme);
    }

    return {theme, toggleTheme};
}
