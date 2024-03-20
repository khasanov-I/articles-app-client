import {type HTMLAttributes, memo, type ReactNode} from 'react';
import cls from './Card.module.scss';
import {classNames} from '@/shared/lib/classNames';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

type CardProps = {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
} & HTMLAttributes<HTMLDivElement>;

export const Card = memo((props: CardProps): ReactNode => {
    const {className = '', children, theme = CardTheme.NORMAL, ...otherProps} = props;

    return <div className={classNames(cls.Card, {}, [className, cls[theme]])}
        {...otherProps}>
        {children}
    </div>;
});
