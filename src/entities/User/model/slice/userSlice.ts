import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {type User, type UserSchema} from '../types/user';
import {USER_LOCAL_STORAGE_KEY} from 'shared/const/localStorage';

const initialState: UserSchema = {
    _inited: false,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData(state, action: PayloadAction<User>) {
            state.authData = action.payload;
        },
        initAuthData(state) {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (user) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                state.authData = JSON.parse(user);
            }

            state._inited = true;
        },
        logout(state) {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        },
    },
});

export const {actions: userActions} = userSlice;
export const {reducer: userReducer} = userSlice;
