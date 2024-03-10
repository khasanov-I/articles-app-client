import {
    type PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import {type StateSchema} from 'app/providers/StoreProvider';
import {type Article} from 'entities/Article';
import {fetchArticlesRecommendations} from '../services/fetchArticlesRecommendations';
import {type ArticleDetailsPageRecommendationSchema} from '../types/ArticleDetailsPageRecommendationSchema';

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: article => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    state => state.articleDetailsPage?.recommendations ?? recommendationsAdapter.getInitialState(),
);

const articleDetailsPageRecommendationSlice = createSlice({
    name: 'articleDetailsPageRecommendationSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticlesRecommendations.pending, state => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesRecommendations.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false;
                    recommendationsAdapter.setAll(state, action.payload);
                })
            .addCase(fetchArticlesRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articleDetailsPageRecommendationReducer,
} = articleDetailsPageRecommendationSlice;
