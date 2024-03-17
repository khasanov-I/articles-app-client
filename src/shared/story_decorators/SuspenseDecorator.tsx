import {type StoryFn} from '@storybook/react';
import {Suspense} from 'react';
import {Loader} from 'shared/ui/Loader/Loader';

export const SuspenseDecorator = (Comp: StoryFn) =>
    <Suspense fallback={<Loader />}>
        <Comp />
    </Suspense>;
