import {type Reducer, type AnyAction, type CombinedState, type ReducersMapObject, type EnhancedStore} from '@reduxjs/toolkit';
import {type ProfileSchema} from 'entities/Profile';
import {type UserSchema} from 'entities/User';
import {type LoginSchema} from 'features/AuthByUsername';

export type StateSchema = {
    user: UserSchema;

    // Async
    profile?: ProfileSchema;
    loginForm?: LoginSchema;
};

export type StateSchemaKey = keyof StateSchema;

export type ReducerManager = {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
};

export type ReduxStoreWithManager = {
    reducerManager?: ReducerManager;
} & EnhancedStore<StateSchema>;
