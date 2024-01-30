import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import cls from './ArticleDetailsPage.module.scss';
import {memo, useCallback, type ReactNode} from 'react';
import {ArticleDetails} from 'entities/Article';
import {useNavigate, useParams} from 'react-router-dom';
import {Text} from 'shared/ui/Text/Text';
import {CommentList} from 'entities/Comment';
import {DynamicModuleLoader, type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {articleDetailsCommentsReducer, getArticleComments} from 'pages/ArticlesDetailsPage/model/slices/articleDetailsCommentsSlice';
import {useSelector} from 'react-redux';
import {getArticleCommentsIsLoading} from 'pages/ArticlesDetailsPage/model/selectors/comments';
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect';
import {useAppDispatch} from 'app/providers/StoreProvider';
import {fetchCommentsArticleById} from 'pages/ArticlesDetailsPage/model/services/fetchCommentsByArticleId';
import {AddCommentFormAsync} from 'features/AddComment';
import {addCommentForArticle} from 'pages/ArticlesDetailsPage/model/services/addCommentForArticle';
import {pagePaths} from 'shared/lib/routeConfig';
import {Button} from 'shared/ui/Button/Button';
import {Page} from 'widgets/Page/ui/Page';

type ArticleDetailsPageProps = {
    className?: string;
};

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation('article-details');

    const {id} = useParams<{id: string}>();

    const comments = useSelector(getArticleComments.selectAll);

    const dispatch = useAppDispatch();

    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(pagePaths.articles);
    }, [navigate]);

    const onSendComment = useCallback((value: string) => {
        void dispatch(addCommentForArticle(value));
    }, [dispatch]);

    useInitialEffect(() => {
        void dispatch(fetchCommentsArticleById(id));
    });

    if (!id) {
        return <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {t('Статья не найдена')}
        </div>;
    }

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <Button onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            <ArticleDetails id={id}/>
            <Text title={t('Комментарии')} className={cls.commentTitle}/>
            <AddCommentFormAsync onSendComment={onSendComment}/>
            <CommentList comments={comments} isLoading={commentsIsLoading}/>
        </Page>
    </DynamicModuleLoader>;
};

export default memo(ArticleDetailsPage);
