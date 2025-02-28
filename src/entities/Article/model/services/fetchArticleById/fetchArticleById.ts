
import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {type Article} from '../../types/article';

export const fetchArticleById
= createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchArticleById',
    async (articleId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI;

        try {
            const response = await extra
                .api
                .get<Article>('/articles/' + articleId);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
