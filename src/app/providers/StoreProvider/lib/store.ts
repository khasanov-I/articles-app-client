import {type ReducersMapObject, configureStore, getDefaultMiddleware, type Reducer, type CombinedState} from '@reduxjs/toolkit';
import {type ThunkExtraArg, type ReduxStoreWithManager, type StateSchema} from './StateSchema';
import {userReducer} from 'entities/User';
import {createReducerManager} from './reducerManager';
import {$api} from 'shared/api/api';
import {type NavigateOptions, type To} from 'react-router-dom';

export function createReduxStore(initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api(),
        navigate,
    };

    const store: ReduxStoreWithManager = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });

    store.reducerManager = reducerManager;

    return store;
}
