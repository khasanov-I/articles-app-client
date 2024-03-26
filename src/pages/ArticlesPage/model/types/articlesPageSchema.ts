import {type EntityState} from '@reduxjs/toolkit';
import {type ArticleView, type Article, type ArticleOrder, type ArticleSort, type ArticleType} from '@/entities/Article';

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
