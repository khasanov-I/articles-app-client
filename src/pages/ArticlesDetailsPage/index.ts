import {ArticleDetailsPageAsync} from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
import {type ArticleDetailsCommentsSchema} from './model/types/ArticleDetailsCommentsSchema';
import {articleDetailsCommentsReducer, getArticleComments} from './model/slices/articleDetailsCommentsSlice';
import {fetchCommentsArticleById} from './model/services/fetchCommentsByArticleId';
import {getArticleCommentsError, getArticleCommentsIsLoading} from './model/selectors/comments';
export {getArticleCommentsError, fetchCommentsArticleById, getArticleComments, articleDetailsCommentsReducer,
    ArticleDetailsPageAsync, type ArticleDetailsCommentsSchema, getArticleCommentsIsLoading};
