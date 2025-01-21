import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {isAxiosError} from 'axios';

type NotificationCreation = {
    title: string;
    description: string;
    href: string;
    userId?: number;
};

export const sendNotification = createAsyncThunk<void, NotificationCreation, ThunkConfig<string>>(
    'sendNotification',
    async (notification, thunkAPI) => {
        const {dispatch, rejectWithValue, extra, getState} = thunkAPI;
        try {
            const response = await extra.api.post('/notifications', notification);

            if (!response.data) {
                throw new Error();
            }
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return rejectWithValue(e.response?.data);
            }

            return rejectWithValue('error');
        }
    },
);
