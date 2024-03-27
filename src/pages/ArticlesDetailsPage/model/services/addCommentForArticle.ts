import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {type Comment} from '@/entities/Comment';
import {getUserAuthData} from '@/entities/User';
import {fetchCommentsArticleById} from './fetchCommentsByArticleId';
import {getArticleDetailsData} from '@/entities/Article';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const {dispatch, rejectWithValue, extra, getState} = thunkAPI;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article?.id,
                userId: userData.id,
                text,
            });

            if (!response.data) {
                throw new Error();
            }

            await dispatch(fetchCommentsArticleById(article.id));

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
