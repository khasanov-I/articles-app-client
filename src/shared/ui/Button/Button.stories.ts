
import type {Meta, StoryObj} from '@storybook/react';

import {Button, ButtonTheme} from './Button';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';
import {themeDecorator} from 'shared/story_decorators';

const meta = {
    title: 'shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        children: 'Text',
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
    args: {
        theme: ButtonTheme.CLEAR,
    },
};

export const ImageButton: Story = {
    args: {
        theme: ButtonTheme.IMAGE_BUTTON,
    },
};

export const ClearLight: Story = {
    args: {
        theme: ButtonTheme.CLEAR,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};

export const ImageButtonLight: Story = {
    args: {
        theme: ButtonTheme.IMAGE_BUTTON,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};
