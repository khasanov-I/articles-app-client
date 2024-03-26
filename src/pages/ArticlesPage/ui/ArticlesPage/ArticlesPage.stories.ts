import {type Meta, type StoryObj} from '@storybook/react';
import ArticlesPage from './ArticlesPage';
import {themeDecorator} from '@/shared/story_decorators';
import {Theme} from '@/shared/const/theme';

const meta = {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    },
} satisfies Meta<typeof ArticlesPage>;
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
