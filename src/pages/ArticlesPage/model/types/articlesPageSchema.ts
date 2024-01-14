import {type EntityState} from '@reduxjs/toolkit';
import {type ArticleView, type Article} from 'entities/Article';

export type ArticlesPageSchema = {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;
} & EntityState<Article>;
