import {type Meta, type StoryObj} from '@storybook/react';
import {reduxDecorator, themeDecorator} from '@/shared/story_decorators';
import {Theme} from '@/shared/const/theme';
import {ArticleRecommendationsList} from './ArticleRecommendationsList';
import {type Article} from '@/entities/Article';

const article: Article = {
    id: '1',
    img: '',
    createdAt: '',
    views: 123,
    user: {
        id: '1',
        username: '123',
    },
    blocks: [],
    type: [],
    title: '123',
    subtitle: 'safad',
};

const meta = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    },
    decorators: [reduxDecorator({})],
} satisfies Meta<typeof ArticleRecommendationsList>;

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

