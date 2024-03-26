import {type StoryFn} from '@storybook/react';
import {type Theme} from '../const/theme';
import {ThemeProvider} from '@/app/providers/ThemeProvider/testing';

export const themeDecorator = ((theme: Theme) => (Comp: StoryFn) =>
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`} style={{width: '1366px', height: '100%'}}>
            <Comp />
        </div>
    </ThemeProvider>);
