import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {userActions, type User} from '@/entities/User';
import {USER_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';
import {jwtDecode} from 'jwt-decode';
import {isAxiosError} from 'axios';

type RegisterProps = {
    username: string;
    password: string;
    avatar: string;
    email: string;
};

type JwtObj = {
    token: string;
};

export const register = createAsyncThunk<User, RegisterProps, ThunkConfig<string>>(
    'register',
    async (authData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI;

        try {
            const response = await extra.api.post<JwtObj>('/auth/register', authData);

            if (!response.data) {
                throw new Error('Возникла непредвиденная ошибка на стороне сервера');
            }

            const decoded = jwtDecode<User>(response.data.token);

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(decoded));
            dispatch(userActions.setAuthData({...decoded, jwt: response.data.token}));
            // Location.reload();
            return decoded;
        } catch (e) {
            if (isAxiosError(e)) {
                return rejectWithValue(e.response?.data.message as string);
            }

            return rejectWithValue('error');
        }
    },
);
