import {useTranslation} from 'react-i18next';
import cls from './ArticleDetails.module.scss';
import {classNames} from 'shared/lib/classNames';
import {useEffect, type ReactNode, memo} from 'react';
import {DynamicModuleLoader, type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {articleDetailsReducer} from 'entities/Article/model/slice/articleDetailsSlice';
import {useAppDispatch} from 'app/providers/StoreProvider';
import {fetchArticleById} from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import {useSelector} from 'react-redux';
import {getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading} from 'entities/Article/model/selectors/articleDetails';
import {Text, TextTheme} from 'shared/ui/Text/Text';
import {Skeleton} from 'shared/ui/Skeleton/Skeleton';

type ArticleDetailsProps = {
    className?: string;
    id: string;
};

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps): ReactNode => {
    const {className = '', id} = props;

    const {t} = useTranslation('article-details');

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const article = useSelector(getArticleDetailsData);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            void dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (<div>
            <Skeleton className={cls.avatar} width={200} height={200} border={'50%'}/>
            <Skeleton className={cls.title} width={300} height={32}/>
            <Skeleton className={cls.skeleton} width={600} height={24}/>
            <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
            <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
        </div>);
    } else if (error) {
        content = (
            <Text title={t('Произошла ошибка при загрузке статьи')}
                theme={TextTheme.ERROR}/>
        );
    } else {
        content = (
            <div>ARTICLE DETAILS</div>
        );
    }

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
            {content}
        </div>;
    </DynamicModuleLoader>;
});
