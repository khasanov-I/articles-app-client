/* eslint-disable @typescript-eslint/indent */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {type Comment} from '@/entities/Comment';

export const fetchCommentsArticleById
= createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchCommentsArticleById',
    async (articleId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI;

        if (!articleId) {
            return rejectWithValue('error');
        }

        try {
            const response = await extra
                .api
                .get<Comment[]>('/comments', {
                    params: {
                        articleId,
                        _expand: 'user',
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
