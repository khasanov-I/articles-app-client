import {createSlice} from '@reduxjs/toolkit';
import {type ArticleCreationSchema} from '../types/articlesCreateSchema';
import {createArticle} from '../services/createArticle';

const initialState: ArticleCreationSchema = {
    isLoading: false,
};
const articleCreateSlice = createSlice({
    name: 'articleCreate',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(createArticle.pending, state => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createArticle.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {actions: articleCreateActions} = articleCreateSlice;
export const {reducer: articleCreateReducer} = articleCreateSlice;
