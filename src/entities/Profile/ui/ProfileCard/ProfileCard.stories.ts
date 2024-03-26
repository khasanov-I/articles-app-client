import {type Meta, type StoryObj} from '@storybook/react';
import {reduxDecorator, themeDecorator} from '@/shared/story_decorators';
import {Theme} from '@/shared/const/theme';
import {ProfileCard} from './ProfileCard';
import {Currency} from '@/entities/Currency';
import {Country} from '@/entities/Country';
import {storyImg} from '@/shared/assets/img';

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        readOnly: true,
        data: {
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
} satisfies Meta<typeof ProfileCard>;

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

export const ClearWithError: Story = {
    args: {
        error: 'error',
    },
    decorators: [reduxDecorator({})],
};

export const ClearWithLoading: Story = {
    args: {
        isLoading: true,
    },
    decorators: [reduxDecorator({})],
};
