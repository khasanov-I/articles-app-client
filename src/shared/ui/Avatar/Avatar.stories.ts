import {type Meta, type StoryObj} from '@storybook/react';
import {Avatar} from './Avatar';
import {themeDecorator} from 'shared/story_decorators';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';
import {storyImg} from 'shared/assets/img';

const meta = {
    title: 'shared/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        src: storyImg as string,
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClearSmall: Story = {
    args: {
        size: 100,
    },
};

export const ClearLightSmall: Story = {
    args: {
        size: 100,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};

export const ClearLarge: Story = {
    args: {
        size: 200,
    },
};

export const ClearLightLarge: Story = {
    args: {
        size: 200,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};
