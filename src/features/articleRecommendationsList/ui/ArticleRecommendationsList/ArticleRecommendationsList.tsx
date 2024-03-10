import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {type Article, ArticleList} from 'entities/Article';
import {Text} from 'shared/ui/Text/Text';
import {VStack} from 'shared/ui/Stack/VStack/VStack';
import {useArticleRecommendationsList} from 'features/articleRecommendationsList/api/articleRecommendationsApi';

type ArticleRecommendationsListProps = {
    className?: string;
};

type UseArticleRecommendationsListProps = {
    data: Article[];
    isLoading: boolean;
    error: string;
};

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const {className} = props;
    const {t} = useTranslation();

    const {isLoading, data, error} = useArticleRecommendationsList<UseArticleRecommendationsListProps>(3);

    return (
        <VStack gap='8' className={classNames('', {}, [className])}>
            <Text title={t('Рекомендации')}/>
            <ArticleList
                articles={data}
                target='_blank'/>
        </VStack>
    );
});
