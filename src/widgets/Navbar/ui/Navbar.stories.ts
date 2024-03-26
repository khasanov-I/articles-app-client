
import type {Meta, StoryObj} from '@storybook/react';
import {Theme} from '@/shared/const/theme';
import {reduxDecorator, themeDecorator} from '@/shared/story_decorators';
import {Navbar} from './Navbar';

const meta = {
    title: 'widgets/Navbar',
    component: Navbar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {

    },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
    args: {
    },
    decorators: [reduxDecorator({})],
};

export const ClearLight: Story = {
    args: {
    },
    decorators: [themeDecorator(Theme.LIGHT), reduxDecorator({})],
};

export const WithAuthData: Story = {
    args: {},
    decorators: [reduxDecorator({user: {authData: {id: '', username: ''}}})],
};

export const WithAuthDataLight: Story = {
    args: {},
    decorators: [themeDecorator(Theme.LIGHT), reduxDecorator({user: {authData: {id: '', username: ''}}})],
};
