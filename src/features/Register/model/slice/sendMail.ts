import {createSlice} from '@reduxjs/toolkit';
import {type SendMailSchema} from '../types/SendMailSchema';
import {sendMail} from '../services/sendMail';

const initialState: SendMailSchema = {
    isLoading: false,
    preventNextClick: false,
};

const sendMailSlice = createSlice({
    name: 'sendMail',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(sendMail.pending, state => {
                state.errors = undefined;
                state.preventNextClick = true;
            })
            .addCase(sendMail.rejected, (state, action) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.errors = action.payload;
                }

                state.preventNextClick = false;
            })
            .addCase(sendMail.fulfilled, (state, action) => {
                state.isLoading = true;
                state.preventNextClick = false;
            });
    },
});

export const {actions: sendMailActions} = sendMailSlice;
export const {reducer: sendMailReducer} = sendMailSlice;
