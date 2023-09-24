import {useTheme} from 'app/providers/ThemeProvider';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';
import {type ReactNode} from 'react';
import {MoonLogo, SunLogo} from 'shared/assets/icons';
import {Button} from 'shared/ui/Button';
import {ButtonTheme} from 'shared/ui/Button/Button';

export function ThemeSwitcher(): ReactNode {
    const {theme, toggleTheme} = useTheme();

    return (
        <Button theme={ButtonTheme.IMAGE_BUTTON} onClick={toggleTheme}>
            <img src={theme === Theme.DARK ? MoonLogo as string : SunLogo as string}></img>
        </Button>
    );
}
