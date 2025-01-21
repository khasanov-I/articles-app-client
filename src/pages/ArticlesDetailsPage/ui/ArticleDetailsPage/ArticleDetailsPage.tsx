import {useTranslation} from 'react-i18next';
import {type ReactNode} from 'react';
import {useParams} from 'react-router-dom';
import {classNames} from '@/shared/lib/classNames';
import cls from './ArticleDetailsPage.module.scss';
import {ArticleDetails, articleDetailsReducer} from '@/entities/Article';
import {DynamicModuleLoader, type ReducersList} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';
import {Page} from '@/widgets/Page';
import {articleDetailsCommentsReducer} from '../../model/slices/articleDetailsCommentsSlice';
import {ArticleDetailsPageHeader} from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import {ArticleDetailsComments} from '../ArticleDetailsComments/ArticleDetailsComments';
import {ArticleRating} from '@/features/articleRating';

type ArticleDetailsPageProps = {
    className?: string;
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation('article-details');

    const {id} = useParams<{id: string}>();

    const reducers: ReducersList = {
        articleDetails: articleDetailsReducer,
        articleDetailsComments: articleDetailsCommentsReducer,
    };

    if (!id) {
        return null;
    }

    console.log('page rendered');

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap='16' max>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id}/>
                <ArticleRating articleId={id} />
                <ArticleDetailsComments id={id}/>
            </VStack>
        </Page>
    </DynamicModuleLoader>;
};

export default ArticleDetailsPage;
