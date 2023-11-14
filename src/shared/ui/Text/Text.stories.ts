import {type Meta, type StoryObj} from '@storybook/react';
import {Text, TextTheme} from './Text';
import {themeDecorator} from 'shared/story_decorators';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';

const meta = {
    title: 'shared/Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        title: 'Title',
        text: 'Text',
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        theme: TextTheme.PRIMARY,
    },
};

export const PrimaryLight: Story = {
    args: {
        theme: TextTheme.PRIMARY,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};

export const Error: Story = {
    args: {
        theme: TextTheme.ERROR,
    },
};

export const ErrorLight: Story = {
    args: {
        theme: TextTheme.ERROR,
    },
    decorators: [themeDecorator(Theme.LIGHT)],
};
