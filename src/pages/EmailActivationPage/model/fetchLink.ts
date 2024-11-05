import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {isAxiosError} from 'axios';

type FetchResponse = {
    activationLink: string;
    isActivated: boolean;
};

type FetchProps = {
    activationLink?: string;
};

export const fetchLink = createAsyncThunk<FetchResponse, FetchProps, ThunkConfig<string>>(
    'fetchLink',
    async (data, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI;

        try {
            const response = await extra.api.get<FetchResponse>(`/mail/${data.activationLink}`);

            if (!response.data) {
                throw new Error('Произошла ошибка');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                return rejectWithValue(e.message);
            }

            return rejectWithValue('error');
        }
    },
);
