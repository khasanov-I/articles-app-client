import {type ReactNode} from 'react';
import {createReduxStore} from '../lib/store';
import {type ReducersMapObject, type DeepPartial} from '@reduxjs/toolkit';
import {type StateSchema} from '../lib/StateSchema';
import {Provider, useDispatch} from 'react-redux';

type StoreProviderProps = {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
};

export function StoreProvider(props: StoreProviderProps) {
    const {children, initialState, asyncReducers} = props;

    const store = createReduxStore(initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>);

    return <Provider store={store}>
        {children}
    </Provider>;
}
