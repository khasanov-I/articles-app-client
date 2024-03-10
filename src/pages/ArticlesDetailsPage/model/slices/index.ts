import {combineReducers} from '@reduxjs/toolkit';
import {type ArticleDetailsPageSchema} from '../types';
import {articleDetailsPageRecommendationReducer} from './articleDetailsPageRecommendationSlice';
import {articleDetailsCommentsReducer} from './articleDetailsCommentsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationReducer,
    comments: articleDetailsCommentsReducer,
});
