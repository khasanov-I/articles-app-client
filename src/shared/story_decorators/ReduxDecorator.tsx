import {type DeepPartial} from '@reduxjs/toolkit';
import {type StoryFn} from '@storybook/react';
import {type StateSchema, StoreProvider} from 'app/providers/StoreProvider';

export const reduxDecorator = (state: DeepPartial<StateSchema>) => (Comp: StoryFn) => <StoreProvider initialState={state}>
    <Comp />
</StoreProvider>;
