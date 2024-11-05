import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {isAxiosError} from 'axios';

type ActivationResponse = {
    activationLink: string;
    isActivated: boolean;
};

type ActivateProps = {
    activationLink?: string;
};

export const activate = createAsyncThunk<ActivationResponse, ActivateProps, ThunkConfig<string>>(
    'activateAccount',
    async (data, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI;

        try {
            const response = await extra.api.post<ActivationResponse>(`/mail/${data.activationLink}`);

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
