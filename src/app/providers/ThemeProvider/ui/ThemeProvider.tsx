import {type ReactNode, useState} from 'react';
import {ThemeContext} from '../../../../shared/lib/context/ThemeContext';
import {LOCAL_STORAGE_THEME} from '@/shared/const/localStorage';
import {Theme} from '@/shared/const/theme';

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
