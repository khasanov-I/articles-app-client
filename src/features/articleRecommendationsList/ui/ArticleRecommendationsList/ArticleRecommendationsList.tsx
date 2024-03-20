import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {type Article, ArticleList} from '@/entities/Article';
import {Text} from '@/shared/ui/Text/Text';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';
import {useArticleRecommendationsList} from '../../api/articleRecommendationsApi';

type ArticleRecommendationsListProps = {
    className?: string;
};

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const {className} = props;
    const {t} = useTranslation();

    const {isLoading, data, error} = useArticleRecommendationsList(3);

    if (isLoading ?? error ?? !data) {
        return null;
    }

    return (
        <VStack gap='8' className={classNames('', {}, [className])}>
            <Text title={t('Рекомендации')}/>
            <ArticleList
                articles={data}
                target='_blank'
                virtualized={false}/>
        </VStack>
    );
});
