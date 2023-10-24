import {type StoryFn} from '@storybook/react';
import {type Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';

// eslint-disable-next-line react/display-name
export const themeDecorator = ((theme: Theme) => (Comp: StoryFn) => <div className={`app ${theme}`} style={{width: '1366px'}}>
    <Comp />
</div>);
