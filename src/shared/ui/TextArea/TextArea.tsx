import {memo, type TextareaHTMLAttributes, type ReactNode} from 'react';
import cls from './TextArea.module.scss';
import {classNames} from '@/shared/lib/classNames';

type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>;

type TextAreaProps = {
    className?: string;
    onChange?: (value: string) => void;
    value?: string | number;
} & HTMLTextAreaProps;

export const TextArea = memo((props: TextAreaProps): ReactNode => {
    const {className = '', children, onChange, value, ...other} = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    // Const autoResize = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    //     e.currentTarget.style.height = 'auto';
    //     e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    // }, []);

    // Для использования, просто запустите функцию enableTab('textarea-id')
    return <textarea value={value} onChange={onChangeHandler} className={classNames(cls.TextArea, {}, [className])} {...other}>
        {children}
    </textarea>;
});
