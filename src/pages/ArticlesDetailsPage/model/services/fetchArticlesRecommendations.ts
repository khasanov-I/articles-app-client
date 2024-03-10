/* eslint-disable @typescript-eslint/indent */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from 'app/providers/StoreProvider';
import {type Article} from 'entities/Article';

export const fetchArticlesRecommendations
= createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articleDetailsPage/fetchArticlesRecommendations',
    async (_, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI;

        try {
            const response = await extra
                .api
                .get<Article[]>('/articles', {
                    params: {
                        _limit: 10,
                    },
                });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
