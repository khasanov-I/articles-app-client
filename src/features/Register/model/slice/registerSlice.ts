import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {type RegisterSchema} from '../types/RegisterSchema';
import {register} from '../services/register';

const initialState: RegisterSchema = {
    isLoading: false,
    username: '',
    password: '',
    avatar: '',
    email: '',
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setAvatar(state, action: PayloadAction<string>) {
            state.avatar = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(register.pending, state => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(register.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {actions: registerActions} = registerSlice;
export const {reducer: registerReducer} = registerSlice;
