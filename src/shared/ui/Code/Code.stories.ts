import {type Meta, type StoryObj} from '@storybook/react';
import {Code} from './Code';
import {themeDecorator} from '@/shared/story_decorators';
import {Theme} from '@/shared/const/theme';

const meta = {
    title: 'shared/Code',
    component: Code,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        text: 'export const ClearLight: Story = {\n'
        + '   args: {\n'
        + '    },\n'
        + '    decorators: [themeDecorator(Theme.LIGHT)],\n'
        + '};',
    },
} satisfies Meta<typeof Code>;
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
