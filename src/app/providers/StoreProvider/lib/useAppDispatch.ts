import {useDispatch} from 'react-redux';
import {type createReduxStore} from './store';
import {type ThunkDispatch, type AnyAction, type CombinedState, type Dispatch} from '@reduxjs/toolkit';
import {type StateSchema, type ThunkExtraArg} from './StateSchema';

type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppDispatch = () =>
    useDispatch<ThunkDispatch<CombinedState<StateSchema>, ThunkExtraArg, AnyAction> & Dispatch>();
