import {type Meta, type StoryObj} from '@storybook/react';
import {Modal} from './Modal';
import {themeDecorator} from 'shared/story_decorators';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';

const meta = {
    title: 'shared/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        isOpen: true,
        children: 'MODAL',
    },
} satisfies Meta<typeof Modal>;

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
