import type {Preview} from '@storybook/react';
import {Theme} from '@/shared/const/theme';
import {SuspenseDecorator, routerDecorator, styleDecorator, themeDecorator} from '@/shared/story_decorators';

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: '^on[A-Z].*'},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [styleDecorator,
        themeDecorator(Theme.DARK),
        routerDecorator,
        SuspenseDecorator],
};

export default preview;
