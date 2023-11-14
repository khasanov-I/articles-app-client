
import type {Meta, StoryObj} from '@storybook/react';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';
import {themeDecorator} from 'shared/story_decorators';
import {Sidebar} from './Sidebar';

const meta = {
    title: 'widgets/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {

    },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
    args: {
    },
};

export const ClearLight: Story = {
    args: {
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};
