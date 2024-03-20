import {type Meta, type StoryObj} from '@storybook/react';
import LoginForm from './LoginForm';
import {reduxDecorator, themeDecorator} from '@/shared/story_decorators';
import {Theme} from '@/app/providers/ThemeProvider/lib/ThemeContext';

const meta = {
    title: 'features/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    },
} satisfies Meta<typeof LoginForm>;

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

export const ClearWithError: Story = {
    args: {
    },
    decorators: [reduxDecorator({
        loginForm: {
            error: 'error',
        },
    })],
};

export const ClearWithLoading: Story = {
    args: {
    },
    decorators: [reduxDecorator({
        loginForm: {
            isLoading: true,
        },
    })],
};
