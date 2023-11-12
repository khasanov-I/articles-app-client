import {type ReactNode} from 'react';
import {createReduxStore} from '../lib/store';
import {type DeepPartial} from '@reduxjs/toolkit';
import {type StateSchema} from '../lib/StateSchema';
import {Provider, useDispatch} from 'react-redux';

type StoreProviderProps = {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
};

export function StoreProvider(props: StoreProviderProps) {
    const {children, initialState} = props;

    const store = createReduxStore(initialState as StateSchema);

    return <Provider store={store}>
        {children}
    </Provider>;
}
