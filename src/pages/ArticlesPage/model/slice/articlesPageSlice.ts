import {
    type PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import {type StateSchema} from 'app/providers/StoreProvider';
import {ArticleView, type Article} from 'entities/Article';
import {type ArticlesPageSchema} from '../types/articlesPageSchema';
import {fetchArticlesList} from '../services/fetchArticlesList/fetchArticlesList';
import {ARTICLES_VIEW_LOCAL_STORAGE_KEY} from 'shared/const/localStorage';
import { ArticleOrder } from 'entities/Article/model/consts/consts';
import { ArticleSort } from 'entities/Article/model/consts/consts';
import {ArticleType} from 'entities/Article/model/consts/consts';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: article => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    state => state.articlesPage ?? articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        order: ArticleOrder.ASC,
        sort: ArticleSort.TITLE,
        search: '',
        limit: 9,
        type: ArticleType.ALL,
    }),
    reducers: {
        setView(state, action: PayloadAction<ArticleView>) {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setOrder(state, action: PayloadAction<ArticleOrder>) {
            state.order = action.payload;
        },
        setSort(state, action: PayloadAction<ArticleSort>) {
            state.sort = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setType(state, action: PayloadAction<ArticleType>) {
            state.type = action.payload;
        },
        initState(state) {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    if (action.meta.arg.replace) {
                        articlesAdapter.setAll(state, action.payload);
                    } else {
                        articlesAdapter.addMany(state, action.payload);
                    }

                    state.hasMore = action.payload.length >= state.limit;
                })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions} = articlesPageSlice;
