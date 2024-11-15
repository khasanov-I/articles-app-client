import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {userActions, type User} from '@/entities/User';
import {TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';
import {jwtDecode} from 'jwt-decode';

type LoginByUsernameProps = {
    username: string;
    password: string;
};

type JwtObj = {
    refreshToken: string;
    accessToken: string;
};

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI;

        try {
            const response = await extra.api.post<JwtObj>('/auth/login', authData);

            if (!response.data) {
                throw new Error();
            }

            const decoded = jwtDecode<User>(response.data.accessToken);
            const auth = {...decoded, jwt: response.data.accessToken};

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify({...decoded}));
            localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(response.data.accessToken));

            dispatch(userActions.setAuthData(auth));
            // Location.reload();
            return decoded;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
