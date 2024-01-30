import {type EntityState} from '@reduxjs/toolkit';
import {type ArticleView, type Article} from 'entities/Article';
import {type ArticleType, type ArticleOrder, type ArticleSort} from 'entities/Article/model/types/article';

export type ArticlesPageSchema = {
    isLoading?: boolean;
    error?: string;

    // Pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // Filters
    view: ArticleView;
    order: ArticleOrder;
    sort: ArticleSort;
    search: string;
    type: ArticleType;

    _inited: boolean;
} & EntityState<Article>;
