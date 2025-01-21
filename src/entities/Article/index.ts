import {type Article} from './model/types/article';
import {ArticleOrder, ArticleView, ArticleSort, ArticleType, ArticleBlockType} from './model/consts/consts';
import {ArticleDetails} from './ui/ArticleDetails/ArticleDetails';
import {type ArticleDetailsSchema} from './model/types/articleDetailsSchema';
import {ArticleList} from './ui/ArticleList/ArticleList';
import {ArticleViewSelector} from './ui/ArticleViewSelector/ArticleViewSelector';
import {ArticleTypeTabs} from './ui/ArticleTypeTabs/ArticleTypeTabs';
import {ArticleSortSelect} from './ui/ArticleSortSelector/ArticleSortSelect';
import {getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading} from './model/selectors/articleDetails';
import {type ArticleBlock} from './model/types/article';
import {ArticleCodeBlockComponent} from './ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {ArticleTextBlockComponent} from './ui/ArticleTextBlockComponent/ArticleTextBlockComponent';

import {ArticleImageBlockComponent} from './ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import {articleDetailsReducer} from './model/slice/articleDetailsSlice';
export type {Article, ArticleDetailsSchema, ArticleBlock};
export {articleDetailsReducer, getArticleDetailsData, getArticleDetailsIsLoading, getArticleDetailsError, ArticleImageBlockComponent, ArticleCodeBlockComponent, ArticleTextBlockComponent, ArticleBlockType, ArticleTypeTabs, ArticleViewSelector, ArticleDetails, ArticleView, ArticleList, ArticleSortSelect, ArticleOrder, ArticleSort, ArticleType};
