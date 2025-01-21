import {memo, useCallback, type ReactNode, Suspense} from 'react';
import {classNames} from '@/shared/lib/classNames';
import {useTranslation} from 'react-i18next';
import {Text} from '@/shared/ui/Text/Text';
import {AddCommentFormAsync} from '@/features/AddComment';
import {CommentList} from '@/entities/Comment';
import {useSelector} from 'react-redux';
import {getArticleComments, getArticleCommentsIsLoading} from '../../model/selectors/comments';
import {addCommentForArticle} from '../../model/services/addCommentForArticle';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect';
import {fetchCommentsArticleById} from '../../model/services/fetchCommentsByArticleId';
import {Loader} from '@/shared/ui/Loader/Loader';
import cls from './ArticleDetailsComments.module.scss';
import {sendNotification} from '@/entities/Notification';
import {getArticleDetailsData} from '@/entities/Article';

type ArticleDetailsCommentsProps = {
    className?: string;
    id?: string;
};

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps): ReactNode => {
    const {className = '', id} = props;

    const {t} = useTranslation();

    const comments = useSelector(getArticleComments);

    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const articleDetails = useSelector(getArticleDetailsData);

    const dispatch = useAppDispatch();

    const onSendComment = useCallback((value: string) => {
        if (value) {
            void dispatch(addCommentForArticle(value));
            void dispatch(sendNotification({
                title: 'Вам отправили комментарий',
                description: 'Проверьте вашу статью по ссылке, чтобы прочитать его',
                userId: articleDetails?.profileId,
                href: `${__CLIENT_URL__}/articles/${articleDetails?.id}`,
            }));
        }
    }, [articleDetails?.id, articleDetails?.profileId, dispatch]);

    useInitialEffect(() => {
        void dispatch(fetchCommentsArticleById(id));
    });

    return <div className={classNames(cls.comments, {}, [className])}>
        <Text className={cls.header} title={t('Комментарии')} />
        <Suspense fallback={<Loader />}>
            <AddCommentFormAsync onSendComment={onSendComment}/>
        </Suspense>
        <CommentList comments={comments} isLoading={commentsIsLoading}/>
    </div>;
});
