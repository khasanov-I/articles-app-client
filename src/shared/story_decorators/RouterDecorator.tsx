import {type StoryFn} from '@storybook/react';
import {BrowserRouter} from 'react-router-dom';

export function routerDecorator(Comp: StoryFn) {
    return <BrowserRouter>
        <Comp />
    </BrowserRouter>;
}
