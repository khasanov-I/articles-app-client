import {type Meta, type StoryObj} from '@storybook/react';
import {ArticleDetails} from './ArticleDetails';
import {reduxDecorator, themeDecorator} from 'shared/story_decorators';
import {Theme} from 'app/providers/ThemeProvider/lib/ThemeContext';

const meta = {
    title: 'entities/ArticleDetails',
    component: ArticleDetails,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        id: '1',
    },
    decorators: [reduxDecorator({})],
} satisfies Meta<typeof ArticleDetails>;
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
