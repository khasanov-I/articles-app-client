import {type Meta, type StoryObj} from '@storybook/react';
import {AppLink, LinkTheme} from './AppLink';
import {themeDecorator} from '@/shared/story_decorators';
import {Theme} from '@/shared/const/theme';

const meta = {
    title: 'shared/AppLink',
    component: AppLink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        to: '/',
        children: 'Link',
    },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
    args: {
        theme: LinkTheme.CLEAR,
    },
};

export const ClearLight: Story = {
    args: {
        theme: LinkTheme.CLEAR,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};
