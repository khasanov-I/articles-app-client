import {memo} from 'react';
import {classNames} from 'shared/lib/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

type TextProps = {
    title?: string;
    className?: string;
    theme?: TextTheme;
    text?: string;
};

export const Text = memo((props: TextProps) => {
    const {className = '', theme = TextTheme.PRIMARY, title, text} = props;

    return <div className={classNames(cls.Text, {}, [className, cls[theme]])}>
        {title ? <p className={cls.title}>{title}</p> : undefined}
        {text ? <p className={cls.text}>{text}</p> : undefined}
    </div>;
});
