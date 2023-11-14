import {type Meta, type StoryObj} from '@storybook/react';
import {LoginModal} from './LoginModal';
import {reduxDecorator, themeDecorator} from 'shared/story_decorators';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';

const meta = {
    title: 'features/LoginModal',
    component: LoginModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        isOpen: true,
    },
} satisfies Meta<typeof LoginModal>;

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
