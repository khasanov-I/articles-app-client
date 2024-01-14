import {memo, useCallback, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import cls from './ArticlesPage.module.scss';
import {ArticleList, ArticleViewSelector, type ArticleView} from 'entities/Article';
import {DynamicModuleLoader, type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {articlesPageActions, articlesPageReducer, getArticles} from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import {useAppDispatch} from 'app/providers/StoreProvider';
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect';
import {fetchArticlesList} from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import {useSelector} from 'react-redux';
import {getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView} from 'pages/ArticlesPage/model/selectors/articlesPageSelector';

type ArticlesPageProps = {
    className?: string;
};

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const articles = useSelector(getArticles.selectAll);

    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    useInitialEffect(() => {
        void dispatch(fetchArticlesList());
        dispatch(articlesPageActions.initState());
    });

    return <DynamicModuleLoader reducers={reducers}>
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleViewSelector view={view} onViewClick={onChangeView}/>
            <ArticleList articles={articles}
                view={view}
                isLoading={isLoading}/>
        </div>
    </DynamicModuleLoader>;
};

export default memo(ArticlesPage);
