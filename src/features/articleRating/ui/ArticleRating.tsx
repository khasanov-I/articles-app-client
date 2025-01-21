import {memo, useCallback, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {RatingCard} from '@/entities/Rating';
import {useGetArticleRating, useRateArticle} from '../api/articleRatingApi';
import {useSelector} from 'react-redux';
import {getUserAuthData} from '@/entities/User';
import {Skeleton} from '@/shared/ui/Skeleton/Skeleton';

export type ArticleRatingProps = {
    className?: string;
    articleId: string;
};

export const ArticleRating = memo((props: ArticleRatingProps): ReactNode => {
    const {className = '', articleId} = props;

    const {t} = useTranslation('article-details');

    const userData = useSelector(getUserAuthData);

    const {data, isLoading} = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(async (starsCount: number, feedback?: string) => {
        try {
            await rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, userData?.id]);

    const onCancel = useCallback(async (starsCount: number) => {
        await handleRateArticle(starsCount);
    }, [handleRateArticle]);

    const onAccept = useCallback(async (starsCount: number, feedback?: string) => {
        await handleRateArticle(starsCount, feedback);
    }, [handleRateArticle]);

    if (isLoading) {
        return <Skeleton width='100%' height='120px'/>;
    }

    const rating = data;

    return <RatingCard
        onCancel={onCancel}
        onAccept={onAccept}
        className={className}
        rate={rating?.rate}
        title={t('Оцените статью')}
        feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')}
        hasFeedback/>;
});
