import {memo, type ReactNode} from 'react';
import cls from './Overlay.module.scss';
import {classNames} from '@/shared/lib/classNames';

type OverlayProps = {
    className?: string;
    onClick?: () => void;
};

export const Overlay = memo((props: OverlayProps): ReactNode => {
    const {className = '', onClick} = props;

    return <div
        onClick={onClick}
        className={classNames(cls.Overlay, {}, [className])} />;
});
