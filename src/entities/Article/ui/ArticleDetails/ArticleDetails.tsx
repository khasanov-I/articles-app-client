import {useTranslation} from 'react-i18next';
import cls from './ArticleDetails.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {useEffect, type ReactNode, memo, useCallback} from 'react';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {fetchArticleById} from '../../model/services/fetchArticleById/fetchArticleById';
import {useSelector} from 'react-redux';
import {getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading} from '../../model/selectors/articleDetails';
import {Text, TextTheme} from '@/shared/ui/Text/Text';
import {CalendarLogo, EyeLogo} from '@/shared/assets/icons';
import {type ArticleBlock} from '../../model/types/article';
import {ArticleBlockType} from '../../model/consts/consts';
import {ArticleCodeBlockComponent} from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {ArticleImageBlockComponent} from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import {ArticleTextBlockComponent} from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {formatDate} from '@/shared/lib/formatDate/formatDate';
import {Avatar} from '@/shared/ui/Avatar/Avatar';
import {Skeleton} from '@/shared/ui/Skeleton/Skeleton';

type ArticleDetailsProps = {
    className?: string;
    id?: string;
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

    if (error) {
        content = (
            <Text title={t('Произошла ошибка при загрузке статьи')}
                theme={TextTheme.ERROR}/>
        );
    }

    if (article) {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar alt='no image' src={`${__API__}/static/${article?.img}`}
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
                    <Text text={article?.createdAt && formatDate(article?.createdAt)}/>
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
        {isLoading ? <div>
            <Skeleton className={cls.avatar} width={200} height={200} border={'50%'}/>
            <Skeleton className={cls.title} width={300} height={32}/>
            <Skeleton className={cls.skeleton} width={600} height={24}/>
            <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
            <Skeleton className={cls.skeleton} width={'100%'} height={200}/>
        </div> : null}
    </div>;
});
