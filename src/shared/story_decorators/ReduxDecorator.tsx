import {type StoryFn} from '@storybook/react';
import {type StateSchema, StoreProvider} from 'app/providers/StoreProvider';
import {profileReducer} from 'entities/Profile';
import {loginReducer} from 'features/AuthByUsername/model/slice/loginSlice';
import {type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
};

export const reduxDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (Comp: StoryFn) =>
        <StoreProvider initialState={state} asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
            <Comp />
        </StoreProvider>;
