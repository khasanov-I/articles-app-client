import {type HTMLAttributes, memo, type ReactNode} from 'react';
import cls from './Card.module.scss';
import {classNames} from 'shared/lib/classNames';

type CardProps = {
    className?: string;
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Card = memo((props: CardProps): ReactNode => {
    const {className = '', children, ...otherProps} = props;

    return <div className={classNames(cls.Card, {}, [className])}
        {...otherProps}>
        {children}
    </div>;
});
