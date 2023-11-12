import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from 'entities/User';
import {loginReducer} from 'features/AuthByUsername';
import {useDispatch} from 'react-redux';

const store = configureStore({
    reducer: {
    },
});
type AppDispatch = typeof store.dispatch; // You can use this Dispatch type in your thunks
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
