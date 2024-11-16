import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {userActions, type User} from '@/entities/User';
import {TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';
import {jwtDecode} from 'jwt-decode';
import axios, {isAxiosError} from 'axios';

export type JwtObj = {
    accessToken: string;
    refreshToken: string;
};

export const checkAuth = createAsyncThunk<User, void, ThunkConfig<string>>(
    'checkAuth',
    async (authData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI;

        try {
            const resp = await axios.get<JwtObj>(`${__API__}/auth/refresh`, {withCredentials: true});
            if (!resp.data) {
                throw new Error('Произошла ошибка на сервере');
            }

            const decoded = jwtDecode<User>(resp.data.accessToken);
            const auth = {...decoded, jwt: resp.data.accessToken};

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify({...decoded}));
            localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(resp.data.accessToken));

            dispatch(userActions.setAuthData(auth));

            // Location.reload();
            return decoded;
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
