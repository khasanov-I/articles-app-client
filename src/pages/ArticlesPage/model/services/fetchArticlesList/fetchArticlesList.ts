/* eslint-disable @typescript-eslint/indent */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {type Article} from '@/entities/Article';
import {getArticlesPageLimit, getArticlesPageNum, getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType} from '../../selectors/articlesPageSelector';
import {addQueryParams} from '@/shared/lib/url/addQueryParams/addQueryParams';

export type FetchArticlesListProps = {
    replace?: boolean;
};

export const fetchArticlesList
= createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI;

        const limit = getArticlesPageLimit(getState());
        const sort = getArticlesPageSort(getState());
        const order = getArticlesPageOrder(getState());
        const search = getArticlesPageSearch(getState());
        const page = getArticlesPageNum(getState());
        const type = getArticlesPageType(getState());

        try {
            addQueryParams({
                sort, order, search, type,
            });
            const response = await extra
                .api
                .get<Article[]>('/articles', {
                    params: {
                        limit,
                        page,
                        sort,
                        order,
                        q: search,
                        type,
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
