import {type EntityState} from '@reduxjs/toolkit';
import {type ArticleView, type Article} from '@/entities/Article';
import {type ArticleOrder} from '@/entities/Article/model/consts/consts';
import {type ArticleSort} from '@/entities/Article/model/consts/consts';
import {type ArticleType} from '@/entities/Article/model/consts/consts';

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
