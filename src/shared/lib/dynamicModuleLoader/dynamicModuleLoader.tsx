import {type ReduxStoreWithManager, type StateSchemaKey} from '@/app/providers/StoreProvider';
import {type Reducer} from '@reduxjs/toolkit';
import {useEffect, type ReactNode} from 'react';
import {useDispatch, useStore} from 'react-redux';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
};

type DynamicModuleLoaderProps = {
    children: ReactNode;
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
};

export function DynamicModuleLoader(props: DynamicModuleLoaderProps): ReactNode {
    const {children, reducers, removeAfterUnmount} = props;

    const dispatch = useDispatch();

    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        const mountedReducers = store.reducerManager?.getReducerMap();

        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers?.[name as StateSchemaKey];
            if (!mounted) {
                store.reducerManager?.add(name as StateSchemaKey, reducer);
                dispatch({type: `@INIT ${name} reducer`});
            }
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager?.remove(name as StateSchemaKey);
                    dispatch({type: `@DESTROY ${name} reducer`});
                });
            }
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);

    return <>{children}</>;
}
