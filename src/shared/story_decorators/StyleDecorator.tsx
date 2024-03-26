import {type StoryFn} from '@storybook/react';
// eslint-disable-next-line kh-i-start-plugin/layer-imports
import '@/app/styles/index.scss';

export function styleDecorator(Comp: StoryFn) {
    return <Comp />;
}
