import {type StateSchema} from '@/app/providers/StoreProvider';
import { ArticleOrder } from '@/entities/Article/model/consts/consts';
import { ArticleSort } from '@/entities/Article/model/consts/consts';
import { ArticleType } from '@/entities/Article/model/consts/consts';

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view;
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit;
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited;
export const getArticlesPageSort = (state: StateSchema) => state.articlesPage?.sort ?? ArticleSort.TITLE;
export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? ArticleOrder.ASC;
export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
export const getArticlesPageType = (state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL;
