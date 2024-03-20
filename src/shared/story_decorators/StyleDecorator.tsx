import {type StoryFn} from '@storybook/react';
import '@/app/styles/index.scss';

export function styleDecorator(Comp: StoryFn) {
    return <Comp />;
}
