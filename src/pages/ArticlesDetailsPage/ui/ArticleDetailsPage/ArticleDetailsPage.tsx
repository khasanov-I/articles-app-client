import {useTranslation} from 'react-i18next';
import {memo, type ReactNode} from 'react';
import {useParams} from 'react-router-dom';
import {classNames} from 'shared/lib/classNames';
import cls from './ArticleDetailsPage.module.scss';
import {ArticleDetails} from 'entities/Article';
import {DynamicModuleLoader, type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {Page} from 'widgets/Page/ui/Page';
import {articleDetailsPageReducer} from '../../model/slices';
import {ArticleDetailsPageHeader} from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import {ArticleRecommendationsList} from 'features/articleRecommendationsList';
import {ArticleDetailsComments} from '../ArticleDetailsComments/ArticleDetailsComments';
import {VStack} from 'shared/ui/Stack/VStack/VStack';

type ArticleDetailsPageProps = {
    className?: string;
};

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation('article-details');

    const {id} = useParams<{id: string}>();

    if (!id) {
        return <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {t('Статья не найдена')}
        </div>;
    }

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap='16' max>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id}/>
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id}/>
            </VStack>
        </Page>
    </DynamicModuleLoader>;
};

export default memo(ArticleDetailsPage);
