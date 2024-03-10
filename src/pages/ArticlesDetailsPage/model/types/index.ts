import {type ArticleDetailsCommentsSchema} from './ArticleDetailsCommentsSchema';
import {type ArticleDetailsPageRecommendationSchema} from './ArticleDetailsPageRecommendationSchema';

export type ArticleDetailsPageSchema = {
    comments: ArticleDetailsCommentsSchema;
    recommendations: ArticleDetailsPageRecommendationSchema;
};
