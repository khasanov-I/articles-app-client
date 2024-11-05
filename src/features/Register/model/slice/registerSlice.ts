import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {type RegisterSchema} from '../types/RegisterSchema';
import {register} from '../services/register';

const initialState: RegisterSchema = {
    isLoading: false,
    username: '',
    password: '',
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
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(register.pending, state => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(register.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const {actions: registerActions} = registerSlice;
export const {reducer: registerReducer} = registerSlice;
