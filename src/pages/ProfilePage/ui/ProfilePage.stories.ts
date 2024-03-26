import {type Meta, type StoryObj} from '@storybook/react';
import {reduxDecorator, themeDecorator} from '@/shared/story_decorators';
import {Theme} from '@/shared/const/theme';
import {Currency} from '@/entities/Currency';
import {Country} from '@/entities/Country';
import {storyImg} from '@/shared/assets/img';
import ProfilePage from './ProfilePage';

const meta = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    },
    decorators: [reduxDecorator({
        profile: {
            readonly: true,
            form: {
                firstname: 'Ilshat',
                lastname: 'Khasanov',
                age: 21,
                currency: Currency.RUB,
                country: Country.Russia,
                city: 'Moscow',
                username: 'admin',
                avatar: storyImg as string,
            },
        },
    })],
} satisfies Meta<typeof ProfilePage>;

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

export const ClearWithError: Story = {
    args: {
    },
    decorators: [reduxDecorator({
        profile: {
            readonly: true,
            error: 'error',
        },
    })],
};

export const ClearWithLoading: Story = {
    args: {
    },
    decorators: [reduxDecorator({
        profile: {
            readonly: true,
            isLoading: true,
        },
    })],
};
