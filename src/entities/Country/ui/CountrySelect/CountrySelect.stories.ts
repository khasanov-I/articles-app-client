import {type Meta, type StoryObj} from '@storybook/react';
import {CountrySelect} from './CountrySelect';
import {themeDecorator} from '@/shared/story_decorators';
import {Theme} from '@/app/providers/ThemeProvider/lib/ThemeContext';

const meta = {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    },
} satisfies Meta<typeof CountrySelect>;

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
