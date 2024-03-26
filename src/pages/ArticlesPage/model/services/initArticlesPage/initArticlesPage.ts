import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {getArticlesPageInited} from '../../selectors/articlesPageSelector';
import {articlesPageActions} from '../../slice/articlesPageSlice';
import {fetchArticlesList} from '../fetchArticlesList/fetchArticlesList';
import {type ArticleOrder, type ArticleSort, type ArticleType} from '@/entities/Article';

export const initArticlesPage
= createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const inited = getArticlesPageInited(getState());
        if (!inited) {
            const orderFromUrl = searchParams.get('order');
            const sortFromUrl = searchParams.get('sort');
            const searchFromUrl = searchParams.get('search');
            const typeFromUrl = searchParams.get('type') as ArticleType;

            if (orderFromUrl) {
                dispatch(articlesPageActions
                    .setOrder(orderFromUrl as ArticleOrder));
            }

            if (sortFromUrl) {
                dispatch(articlesPageActions
                    .setSort(sortFromUrl as ArticleSort));
            }

            if (searchFromUrl) {
                dispatch(articlesPageActions
                    .setSearch(searchFromUrl));
            }

            if (typeFromUrl) {
                dispatch(articlesPageActions
                    .setType(typeFromUrl));
            }

            dispatch(articlesPageActions.initState());
            await dispatch(fetchArticlesList({}));
        }
    },
);
