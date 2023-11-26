import {useTheme} from 'app/providers/ThemeProvider';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';
import {memo, type ReactNode} from 'react';
import {MoonLogo, SunLogo} from 'shared/assets/icons';
import {Button} from 'shared/ui/Button';
import {ButtonTheme} from 'shared/ui/Button/Button';

export const ThemeSwitcher = memo((): ReactNode => {
    const {theme, toggleTheme} = useTheme();

    return (
        <Button theme={ButtonTheme.IMAGE_BUTTON} onClick={toggleTheme}>
            {theme === Theme.DARK ? <MoonLogo className='img'/> : <SunLogo className='img'/>}
        </Button>
    );
});
