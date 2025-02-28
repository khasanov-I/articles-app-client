
import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageLimit, getArticlesPageNum} from '../../selectors/articlesPageSelector';
import {articlesPageActions} from '../../slice/articlesPageSlice';
import {fetchArticlesList} from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage
= createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const hasMore = getArticlesPageHasMore(getState()) ?? true;
        const page = getArticlesPageNum(getState()) ?? 0;
        const limit = getArticlesPageLimit(getState()) ?? 9;
        const isLoading = getArticlesPageIsLoading(getState()) ?? false;

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + limit));
            void dispatch(fetchArticlesList({}));
        }
    },
);
