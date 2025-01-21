
import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {type Article} from '@/entities/Article';

export const fetchArticlesByProfile
= createAsyncThunk<Article[], string, ThunkConfig<string>>(
    'profilePage/fetchArticlesByProfile',
    async (id, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI;

        try {
            const response = await extra
                .api
                .get<Article[]>(`/articles/byProfileId/${id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
