import {type StoryFn} from '@storybook/react';
import {ThemeProvider} from '@/app/providers/ThemeProvider';
import {type Theme} from '@/app/providers/ThemeProvider/lib/ThemeContext';

export const themeDecorator = ((theme: Theme) => (Comp: StoryFn) =>
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`} style={{width: '1366px', height: '100%'}}>
            <Comp />
        </div>
    </ThemeProvider>);
