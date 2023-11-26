import {type ReducersMapObject, type DeepPartial} from '@reduxjs/toolkit';
import {type StoryFn} from '@storybook/react';
import {type StateSchema, StoreProvider} from 'app/providers/StoreProvider';
import {profileReducer} from 'entities/Profile';
import {loginReducer} from 'features/AuthByUsername/model/slice/loginSlice';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
    profile: profileReducer,
};

export const reduxDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) =>
    (Comp: StoryFn) =>
        <StoreProvider initialState={state} asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
            <Comp />
        </StoreProvider>;
