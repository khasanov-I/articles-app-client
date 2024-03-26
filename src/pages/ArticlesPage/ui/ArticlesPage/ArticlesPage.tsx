import {memo, useCallback, type ReactNode} from 'react';
import {classNames} from '@/shared/lib/classNames';
import cls from './ArticlesPage.module.scss';
import {DynamicModuleLoader, type ReducersList} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {articlesPageReducer} from '../../model/slice/articlesPageSlice';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect';
import {fetchNextArticlesPage} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {initArticlesPage} from '../../model/services/initArticlesPage/initArticlesPage';
import {ArticlesPageFilters} from '../ArticlesPageFilters/ArticlesPageFilters';
import {useSearchParams} from 'react-router-dom';
import {ArticlesInfiniteList} from '../ArticlesInfiniteList/ArticlesInfiniteList';
import {Page} from '@/widgets/Page';

type ArticlesPageProps = {
    className?: string;
};

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps): ReactNode => {
    const {className = ''} = props;

    const dispatch = useAppDispatch();

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
            <ArticlesInfiniteList className={cls.list} />
        </Page>
    </DynamicModuleLoader>;
};

export default memo(ArticlesPage);
