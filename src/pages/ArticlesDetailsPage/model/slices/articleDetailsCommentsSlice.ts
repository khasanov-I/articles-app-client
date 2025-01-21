import {
    type PayloadAction,
    createSlice,
} from '@reduxjs/toolkit';
import {type Comment} from '@/entities/Comment';
import {type ArticleDetailsCommentsSchema} from '../types/ArticleDetailsCommentsSchema';
import {fetchCommentsArticleById} from '../services/fetchCommentsByArticleId';

const initialState: ArticleDetailsCommentsSchema = {
    comments: [],
    isLoading: false,
};

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCommentsArticleById.pending, state => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsArticleById.fulfilled,
                (state, action: PayloadAction<Comment[]>) => {
                    state.isLoading = false;
                    state.comments = action.payload;
                })
            .addCase(fetchCommentsArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {reducer: articleDetailsCommentsReducer} = articleDetailsCommentsSlice;
export const {actions: articleDetailsCommentsActions} = articleDetailsCommentsSlice;
