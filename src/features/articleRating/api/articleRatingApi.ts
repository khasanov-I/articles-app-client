import {type Rating} from '@/entities/Rating';
import {rtkApi} from '@/shared/api/rtkApi';

type GetArticleRatingArg = {
    userId: string;
    articleId: string;
};

type RateArticleArg = {
    userId: string;
    articleId: string;
    rate: number;
    feedback?: string;
};

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: build => ({
        getArticleRating: build.query<Rating, GetArticleRatingArg>({
            query: ({userId, articleId}) => ({
                url: `/article-ratings/${articleId}/${userId}`,
            }),
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            query: arg => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
