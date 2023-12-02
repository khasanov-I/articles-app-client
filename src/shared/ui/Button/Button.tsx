import {memo, type ButtonHTMLAttributes, type ReactNode} from 'react';
import {type Mods, classNames} from 'shared/lib/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    IMAGE_BUTTON = 'image-button',
}

type ButtonProps = {
    className?: string;
    theme?: ButtonTheme;
    disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo((props: ButtonProps): ReactNode => {
    const {className = '', theme = ButtonTheme.CLEAR, children, disabled, ...otherProps} = props;

    const mods: Mods = {
        [cls.disabled]: disabled,
    };

    return (
        <button
            className={classNames(cls.Button, mods, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
});
