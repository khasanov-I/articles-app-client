import {type CSSProperties, memo, type ReactNode} from 'react';
import cls from './Skeleton.module.scss';
import {classNames} from 'shared/lib/classNames';

type SkeletonProps = {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
};

export const Skeleton = memo((props: SkeletonProps): ReactNode => {
    const {className = '', height, width, border} = props;

    const styles: CSSProperties = {
        width, height, borderRadius: border,
    };

    return <div className={classNames(cls.Skeleton, {}, [className])}
        style={styles}>
    </div>;
});
