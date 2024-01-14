import {useTranslation} from 'react-i18next';
import cls from './ArticleDetails.module.scss';
import {classNames} from 'shared/lib/classNames';
import {useEffect, type ReactNode, memo, useCallback} from 'react';
import {DynamicModuleLoader, type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {articleDetailsReducer} from 'entities/Article/model/slice/articleDetailsSlice';
import {useAppDispatch} from 'app/providers/StoreProvider';
import {fetchArticleById} from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import {useSelector} from 'react-redux';
import {getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading} from 'entities/Article/model/selectors/articleDetails';
import {Text, TextTheme} from 'shared/ui/Text/Text';
import {Skeleton} from 'shared/ui/Skeleton/Skeleton';
import {Avatar} from 'shared/ui/Avatar/Avatar';
import {CalendarLogo, EyeLogo} from 'shared/assets/icons';
import {type ArticleBlock, ArticleBlockType} from 'entities/Article/model/types/article';
import {ArticleCodeBlockComponent} from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {ArticleImageBlockComponent} from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import {ArticleTextBlockComponent} from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

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

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block}/>;
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block}/>;
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block}/>;
            default:
                return null;
        }
    }, []);

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
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar src={article?.img}
                        size={200}
                        className={cls.avatar}
                    />
                </div>
                <Text title={article?.title} text={article?.subtitle}/>
                <div className={cls.articleInfo}>
                    <EyeLogo className='icons' />
                    <Text text={String(article?.views)}/>
                </div>
                <div className={cls.articleInfo}>
                    <CalendarLogo className='icons' />
                    <Text text={article?.createdAt}/>
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
            {content}
        </div>
    </DynamicModuleLoader>;
});
