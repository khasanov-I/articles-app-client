import {type ButtonHTMLAttributes, type ReactNode} from 'react';
import {classNames} from 'shared/lib/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    IMAGE_BUTTON = 'image-button',
}

type ButtonProps = {
    className?: string;
    theme?: ButtonTheme;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps): ReactNode {
    const {className = '', theme = ButtonTheme.CLEAR, children, ...otherProps} = props;

    return (
        <button
            className={classNames(cls.Button, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
}
