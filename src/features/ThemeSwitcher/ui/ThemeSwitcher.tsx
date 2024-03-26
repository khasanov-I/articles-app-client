import {Theme} from '@/shared/const/theme';
import {memo, type ReactNode} from 'react';
import {MoonLogo, SunLogo} from '@/shared/assets/icons';
import {Button} from '@/shared/ui/Button/Button';
import {ButtonTheme} from '@/shared/ui/Button/Button';
import {useTheme} from '@/shared/lib/hooks/useTheme';

export const ThemeSwitcher = memo((): ReactNode => {
    const {theme, toggleTheme} = useTheme();

    return (
        <Button theme={ButtonTheme.IMAGE_BUTTON} onClick={toggleTheme}>
            {theme === Theme.DARK ? <MoonLogo className='img'/> : <SunLogo className='img'/>}
        </Button>
    );
});
