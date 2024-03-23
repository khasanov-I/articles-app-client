import {type HTMLAttributes, memo, type ReactNode} from 'react';
import cls from './Card.module.scss';
import {type Mods, classNames} from '@/shared/lib/classNames';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

type CardProps = {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    max?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Card = memo((props: CardProps): ReactNode => {
    const {className = '', children, theme = CardTheme.NORMAL, max, ...otherProps} = props;

    const mods: Mods = {
        [cls.max]: max,
    };

    return <div className={classNames(cls.Card, mods, [className, cls[theme]])}
        {...otherProps}>
        {children}
    </div>;
});
