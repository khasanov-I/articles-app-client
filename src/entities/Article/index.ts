import {type ArticleBlock, type Article} from './model/types/article';
import {ArticleDetails} from './ui/ArticleDetails/ArticleDetails';
import {type ArticleDetailsSchema} from './model/types/articleDetailsSchema';
import {articleDetailsActions, articleDetailsReducer} from './model/slice/articleDetailsSlice';
import {getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading} from './model/selectors/articleDetails';

export type {ArticleBlock, Article, ArticleDetailsSchema};
export {ArticleDetails, articleDetailsActions, articleDetailsReducer,
    getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading};
