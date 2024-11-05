import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {userActions, type User} from '@/entities/User';
import {USER_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';
import {jwtDecode} from 'jwt-decode';
import {createFormdataFromObject} from '@/shared/lib/createFormdataFromObject/createFormdataFromObject';
import {isAxiosError} from 'axios';

type RegisterProps = {
    username: string;
    password: string;
    avatar?: File;
    email: string;
};

type JwtObj = {
    accessToken: string;
    refreshToken: string;
};

export const register = createAsyncThunk<User, RegisterProps, ThunkConfig<string>>(
    'register',
    async (authData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI;

        try {
            const formdata = createFormdataFromObject(authData);

            const resp = await extra.api.post<JwtObj>('/auth/register', formdata);
            if (!resp.data) {
                throw new Error('Произошла ошибка на сервере');
            }

            const decoded = jwtDecode<User>(resp.data.accessToken);

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(decoded));
            dispatch(userActions.setAuthData({...decoded, jwt: resp.data.accessToken}));
            // Location.reload();
            return decoded;
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                return rejectWithValue(e.message);
            }

            return rejectWithValue('error');
        }
    },
);
