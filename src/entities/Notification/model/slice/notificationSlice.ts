import {createSlice} from '@reduxjs/toolkit';
import {sendNotification} from '../services/sendNotification';
import {type NotificationSchema} from '../types/notification';

const initialState: NotificationSchema = {
    isLoading: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(sendNotification.pending, state => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(sendNotification.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(sendNotification.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {actions: notificationActions} = notificationSlice;
export const {reducer: notificationReducer} = notificationSlice;
