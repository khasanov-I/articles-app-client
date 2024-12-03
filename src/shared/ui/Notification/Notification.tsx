import {memo, type ReactNode} from 'react';
import cls from './Notification.module.scss';
import {classNames} from '@/shared/lib/classNames';

type NotificationProps = {
    className?: string;
    children: ReactNode;
};

export const Notification = memo((props: NotificationProps): ReactNode => {
    const {className = '', children} = props;

    return <div className={classNames(cls.Notification, {}, [className])}>
        {children}
    </div>;
});
