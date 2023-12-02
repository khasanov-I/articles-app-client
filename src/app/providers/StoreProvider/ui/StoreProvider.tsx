import {type ReactNode} from 'react';
import {createReduxStore} from '../lib/store';
import {type ReducersMapObject} from '@reduxjs/toolkit';
import {type StateSchema} from '../lib/StateSchema';
import {Provider} from 'react-redux';
import {useNavigate} from 'react-router-dom';

type StoreProviderProps = {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
};

export function StoreProvider(props: StoreProviderProps) {
    const {children, initialState, asyncReducers} = props;

    const navigate = useNavigate();

    const store = createReduxStore(initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        navigate);

    return <Provider store={store}>
        {children}
    </Provider>;
}
