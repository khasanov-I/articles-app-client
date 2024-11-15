import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {isAxiosError} from 'axios';
import {userActions} from '@/entities/User';

export const logout = createAsyncThunk<boolean, void, ThunkConfig<string>>(
    'logout',
    async (authData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI;

        try {
            const resp = await extra.api.post<boolean>('/auth/logout');
            if (!resp.data) {
                throw new Error('Произошла ошибка на сервере');
            }

            dispatch(userActions.logout());
            // Location.reload();
            return resp.data;
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
