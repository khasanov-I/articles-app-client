import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {userActions, type User} from '@/entities/User';
import {USER_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';
import {jwtDecode} from 'jwt-decode';

type LoginByUsernameProps = {
    username: string;
    password: string;
};

type JwtObj = {
    token: string;
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

            const decoded = jwtDecode<User>(response.data.token);

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(decoded));
            dispatch(userActions.setAuthData({...decoded, jwt: response.data.token}));
            // Location.reload();
            return decoded;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
