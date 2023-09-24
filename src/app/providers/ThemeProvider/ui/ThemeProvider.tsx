import {type ReactNode, useState} from 'react';
import {LOCAL_STORAGE_THEME, Theme, ThemeContext} from '../lib/ThemeContext';

export function ThemeProvider({
    children,
}: {
    children: ReactNode;
}): ReactNode {
    const [theme, setTheme] = useState(
        (localStorage.getItem(LOCAL_STORAGE_THEME) as Theme) || Theme.LIGHT,
    );

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
