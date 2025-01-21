import {memo, useCallback, type ReactNode} from 'react';
import cls from './AddCommentForm.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {Input} from '@/shared/ui/Input/Input';
import {Button} from '@/shared/ui/Button/Button';
import {useTranslation} from 'react-i18next';
import {getAddCommentError, getAddCommentText} from '../../model/selectors/addCommentSelectors';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {addCommentActions, addCommentReducer} from '../../model/slice/addCommentSlice';
import {DynamicModuleLoader, type ReducersList} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {notificationReducer} from '@/entities/Notification';

export type AddCommentFormProps = {
    className?: string;
    onSendComment: (value: string) => void;
};

const AddCommentForm = memo((props: AddCommentFormProps): ReactNode => {
    const {className = '', onSendComment} = props;

    const reducers: ReducersList = {
        addComment: addCommentReducer,
        notification: notificationReducer,
    };

    const text = useSelector(getAddCommentText);

    const error = useSelector(getAddCommentError);

    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text);
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    const {t} = useTranslation();

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.AddCommentForm, {}, [className])}>
            <Input className={cls.input} value={text} onChange={onCommentTextChange}
                placeholder={t('Введите текст комментария')}/>
            <Button onClick={onSendHandler}>
                {t('Отправить')}
            </Button>
        </div>
    </DynamicModuleLoader>;
});

export default AddCommentForm;
