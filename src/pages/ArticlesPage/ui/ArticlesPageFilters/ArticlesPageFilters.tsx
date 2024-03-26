import {memo, useCallback, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import cls from './ArticlesPageFilters.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {type ArticleView,
    ArticleViewSelector,
    ArticleTypeTabs,
    type ArticleSort,
    type ArticleOrder,
    type ArticleType,
    ArticleSortSelect} from '@/entities/Article';
import {useSelector} from 'react-redux';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView} from '../../model/selectors/articlesPageSelector';
import {articlesPageActions} from '../../model/slice/articlesPageSlice';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {Card} from '@/shared/ui/Card/Card';
import {Input} from '@/shared/ui/Input/Input';
import {fetchArticlesList} from '../../model/services/fetchArticlesList/fetchArticlesList';
import {useDebounce} from '@/shared/lib/hooks/useDebounce';
import {type TabItem} from '@/shared/ui/Tabs/Tabs';

type ArticlesPageFiltersProps = {
    className?: string;
};

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const view = useSelector(getArticlesPageView);

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        void dispatch(fetchArticlesList({replace: true}));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onChangeSort = useCallback((sort: ArticleSort) => {
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((order: ArticleOrder) => {
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((tab: TabItem<ArticleType>) => {
        dispatch(articlesPageActions.setType(tab.value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
        <div className={cls.sortWrapper}>
            <ArticleSortSelect
                order={order}
                sort={sort}
                onChangeOrder={onChangeOrder}
                onChangeSort={onChangeSort}/>
            <ArticleViewSelector
                view={view}
                onViewClick={onChangeView}/>
        </div>
        <Card className={cls.search}>
            <Input
                onChange={onChangeSearch}
                value={search}
                placeholder={t('Поиск')}/>
        </Card>
        <ArticleTypeTabs
            className={cls.tabs}
            value={type}
            onChangeType={onChangeType}/>
    </div>;
});
