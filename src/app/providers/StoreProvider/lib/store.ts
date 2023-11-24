import {type ReducersMapObject, configureStore} from '@reduxjs/toolkit';
import {type ReduxStoreWithManager, type StateSchema} from './StateSchema';
import {userReducer} from 'entities/User';
import {createReducerManager} from './reducerManager';

export function createReduxStore(initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store: ReduxStoreWithManager = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    store.reducerManager = reducerManager;

    return store;
}
