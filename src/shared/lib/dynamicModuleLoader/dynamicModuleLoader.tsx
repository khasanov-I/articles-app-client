import {type Reducer} from '@reduxjs/toolkit';
import {type ReduxStoreWithManager, type StateSchemaKey} from 'app/providers/StoreProvider/lib/StateSchema';
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

type ReducersListEntry = [StateSchemaKey, Reducer];

export function DynamicModuleLoader(props: DynamicModuleLoaderProps): ReactNode {
    const {children, reducers, removeAfterUnmount} = props;

    const dispatch = useDispatch();

    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
            store.reducerManager?.add(name, reducer);
            dispatch({type: `@INIT ${name} reducer`});
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
                    store.reducerManager?.remove(name);
                    dispatch({type: `@DESTROY ${name} reducer`});
                });
            }
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);

    return <>{children}</>;
}
