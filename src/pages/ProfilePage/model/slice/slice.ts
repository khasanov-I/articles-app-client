import {
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';
import {fetchArticlesByProfile} from '../services/getArticlesByProfileId';
import {type ProfileArticleListSchema} from '../types/articles';
import {type Article} from '@/entities/Article';

const initialState: ProfileArticleListSchema = {
    isLoading: false,
    articles: [],
    mounted: false,
};

const profileArticlesSlice = createSlice({
    name: 'profileArticlesSlice',
    initialState,
    reducers: {
        setMounted(state) {
            state.mounted = true;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticlesByProfile.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchArticlesByProfile.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.articles = action.payload;
                    state.isLoading = false;
                    state.mounted = true;
                })
            .addCase(fetchArticlesByProfile.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
    },
});

export const {
    reducer: profileArticlesReducer,
    actions: profileArticlesActions} = profileArticlesSlice;
