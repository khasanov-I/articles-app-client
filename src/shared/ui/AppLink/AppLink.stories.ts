import {type Meta, type StoryObj} from '@storybook/react';
import {AppLink, LinkTheme} from './AppLink';
import {themeDecorator} from 'shared/story_decorators';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';

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

export const SidebarLink: Story = {
    args: {
        theme: LinkTheme.SIDEBAR_LINK,
    },
};

export const SidebarLinkLight: Story = {
    args: {
        theme: LinkTheme.SIDEBAR_LINK,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};
