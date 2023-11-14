import {type ReactNode, useState} from 'react';
import {LOCAL_STORAGE_THEME, Theme, ThemeContext} from '../lib/ThemeContext';

type ThemeProviderProps = {
    children?: ReactNode;
    initialTheme?: Theme;
};

export function ThemeProvider(props: ThemeProviderProps): ReactNode {
    const {children, initialTheme} = props;

    const [theme, setTheme] = useState(initialTheme ? initialTheme
        : (localStorage.getItem(LOCAL_STORAGE_THEME) as Theme) || Theme.LIGHT,
    );

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
