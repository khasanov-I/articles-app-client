import {memo, useCallback, type ReactNode} from 'react';
import {classNames} from 'shared/lib/classNames';
import {useTranslation} from 'react-i18next';
import {Text} from 'shared/ui/Text/Text';
import {AddCommentFormAsync} from 'features/AddComment';
import {CommentList} from 'entities/Comment';
import {useSelector} from 'react-redux';
import {getArticleComments} from 'pages/ArticlesDetailsPage/model/slices/articleDetailsCommentsSlice';
import {getArticleCommentsIsLoading} from 'pages/ArticlesDetailsPage/model/selectors/comments';
import {addCommentForArticle} from 'pages/ArticlesDetailsPage/model/services/addCommentForArticle';
import {useAppDispatch} from 'app/providers/StoreProvider';
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect';
import {fetchCommentsArticleById} from 'pages/ArticlesDetailsPage/model/services/fetchCommentsByArticleId';

type ArticleDetailsCommentsProps = {
    className?: string;
    id: string;
};

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps): ReactNode => {
    const {className = '', id} = props;

    const {t} = useTranslation();

    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const dispatch = useAppDispatch();

    const onSendComment = useCallback((value: string) => {
        void dispatch(addCommentForArticle(value));
    }, [dispatch]);

    useInitialEffect(() => {
        void dispatch(fetchCommentsArticleById(id));
    });

    return <div className={classNames('', {}, [className])}>
        <Text title={t('Комментарии')} />
        <AddCommentFormAsync onSendComment={onSendComment}/>
        <CommentList comments={comments} isLoading={commentsIsLoading}/>
    </div>;
});
