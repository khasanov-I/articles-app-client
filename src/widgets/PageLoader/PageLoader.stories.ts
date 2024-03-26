
import type {Meta, StoryObj} from '@storybook/react';
import {Theme} from '@/shared/const/theme';
import {reduxDecorator, themeDecorator} from '@/shared/story_decorators';
import {PageLoader} from './PageLoader';

const meta = {
    title: 'widgets/PageLoader',
    component: PageLoader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {

    },
} satisfies Meta<typeof PageLoader>;

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
