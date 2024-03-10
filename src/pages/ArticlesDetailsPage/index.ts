import {ArticleDetailsPageAsync} from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
import {type ArticleDetailsCommentsSchema} from './model/types/ArticleDetailsCommentsSchema';
import {articleDetailsCommentsReducer, getArticleComments} from './model/slices/articleDetailsCommentsSlice';
import {fetchCommentsArticleById} from './model/services/fetchCommentsByArticleId';
import {getArticleCommentsError, getArticleCommentsIsLoading} from './model/selectors/comments';
import {type ArticleDetailsPageRecommendationSchema} from './model/types/ArticleDetailsPageRecommendationSchema';
import {type ArticleDetailsPageSchema} from './model/types';
export {getArticleCommentsError, type ArticleDetailsPageSchema, fetchCommentsArticleById, getArticleComments, articleDetailsCommentsReducer,
    ArticleDetailsPageAsync, type ArticleDetailsPageRecommendationSchema, type ArticleDetailsCommentsSchema, getArticleCommentsIsLoading};
