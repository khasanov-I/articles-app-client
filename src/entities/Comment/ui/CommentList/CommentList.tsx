import {memo, type ReactNode} from 'react';
import cls from './CommentList.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {type Comment} from '@/entities/Comment/model/types/comment';
import {Text} from '@/shared/ui/Text/Text';
import {useTranslation} from 'react-i18next';
import {CommentCard} from '../CommentCard/CommentCard';

type CommentListProps = {
    className?: string;
    comments: Comment[];
    isLoading?: boolean;
};

export const CommentList = memo((props: CommentListProps): ReactNode => {
    const {className = '', comments, isLoading} = props;

    const {t} = useTranslation();

    if (isLoading) {
        return <div className={classNames(cls.CommentList, {}, [className])}>
            <CommentCard isLoading/>
            <CommentCard isLoading/>
            <CommentCard isLoading/>
        </div>;
    }

    return <div className={classNames(cls.CommentList, {}, [className])}>
        {comments.length
            ? comments.map(comment => <CommentCard key={comment.id} isLoading={isLoading}
                comment={comment} className={cls.comment}/>)
            : <Text text={t('Комментарии отсутствуют')}/>}
    </div>;
});
