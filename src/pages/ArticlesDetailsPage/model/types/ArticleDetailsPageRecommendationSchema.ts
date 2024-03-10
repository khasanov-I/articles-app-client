import {type EntityState} from '@reduxjs/toolkit';
import {type Article} from 'entities/Article';

export type ArticleDetailsPageRecommendationSchema = {
    isLoading?: boolean;
    error?: string;
} & EntityState<Article>;
