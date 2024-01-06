import {type Meta, type StoryObj} from '@storybook/react';
import {Skeleton} from './Skeleton';
import {themeDecorator} from 'shared/story_decorators';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';

const meta = {
    title: 'shared/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    },
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Circle: Story = {
    args: {
        border: '50%',
        width: 100,
        height: 100,
    },
};

export const CircleLight: Story = {
    args: {
        border: '50%',
        width: 100,
        height: 100,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};

export const Normal: Story = {
    args: {
        width: '100%',
        height: 200,
    },
};

export const NormalLight: Story = {
    args: {
        width: '100%',
        height: 200,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};
