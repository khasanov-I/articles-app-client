import {type ReducersMapObject, configureStore, type Reducer, type CombinedState} from '@reduxjs/toolkit';
import {type ThunkExtraArg, type ReduxStoreWithManager, type StateSchema} from './StateSchema';
import {userReducer} from '@/entities/User';
import {createReducerManager} from './reducerManager';
import $api from '@/shared/api/api';
import {rtkApi} from '@/shared/api/rtkApi';
import {ScrollRestorationReducer} from '@/features/UI';

export function createReduxStore(initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        scrollRestoration: ScrollRestorationReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store: ReduxStoreWithManager = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(rtkApi.middleware),
    });

    store.reducerManager = reducerManager;

    return store;
}
