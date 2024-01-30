import {memo, useCallback, type ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames';
import cls from './ArticlesPage.module.scss';
import {ArticleList} from 'entities/Article';
import {DynamicModuleLoader, type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {articlesPageReducer, getArticles} from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import {useAppDispatch} from 'app/providers/StoreProvider';
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect';
import {getArticlesPageIsLoading, getArticlesPageView} from 'pages/ArticlesPage/model/selectors/articlesPageSelector';
import {Page} from 'widgets/Page/ui/Page';
import {fetchNextArticlesPage} from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {initArticlesPage} from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import {ArticlesPageFilters} from '../ArticlesPageFilters/ArticlesPageFilters';
import {useSearchParams} from 'react-router-dom';

type ArticlesPageProps = {
    className?: string;
};

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps): ReactNode => {
    const {className = ''} = props;

    const dispatch = useAppDispatch();

    const articles = useSelector(getArticles.selectAll);

    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    const onLoadNextPart = useCallback(() => {
        void dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    const [searchParams] = useSearchParams();

    useInitialEffect(async () => {
        void dispatch(initArticlesPage(searchParams));
    });

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticlesPageFilters />
            <ArticleList
                className={cls.list}
                articles={articles}
                view={view}
                isLoading={isLoading}/>
        </Page>
    </DynamicModuleLoader>;
};

export default memo(ArticlesPage);
