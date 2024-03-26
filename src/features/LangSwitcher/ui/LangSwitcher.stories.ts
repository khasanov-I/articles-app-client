
import type {Meta, StoryObj} from '@storybook/react';
import {Theme} from '@/shared/const/theme';
import {themeDecorator} from '@/shared/story_decorators';
import {LangSwitcher} from './LangSwitcher';

const meta = {
    title: 'widgets/LangSwitcher',
    component: LangSwitcher,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    },
} satisfies Meta<typeof LangSwitcher>;

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
