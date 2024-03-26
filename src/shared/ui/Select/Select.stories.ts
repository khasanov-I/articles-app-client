import {type Meta, type StoryObj} from '@storybook/react';
import {Select} from './Select';
import {themeDecorator} from '@/shared/story_decorators';
import {Theme} from '@/shared/const/theme';

const meta = {
    title: 'shared/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        label: 'Укажите значение',
        options: [{
            value: 'Уфа',
            content: 'Уфа',
        },
        {
            value: 'Санкт-Петербург',
            content: 'Санкт-Петербург',
        },
        {
            value: 'Москва',
            content: 'Москва',
        }],
    },
} satisfies Meta<typeof Select>;

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
