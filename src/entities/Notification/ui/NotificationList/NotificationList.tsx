import {memo, type ReactNode} from 'react';
import cls from './NotificationList.module.scss';
import {classNames} from 'shared/lib/classNames';
import {useNotifications} from '../../api/notificationApi';
import {VStack} from 'shared/ui/Stack/VStack/VStack';
import {NotificationItem} from '../NotificationItem/NotificationItem';
import {Skeleton} from 'shared/ui/Skeleton/Skeleton';

type NotificationListProps = {
    className?: string;
};

export const NotificationList = memo((props: NotificationListProps): ReactNode => {
    const {className = ''} = props;

    const {data, isLoading} = useNotifications(undefined, {
        pollingInterval: 10000,
    });

    if (isLoading) {
        return <VStack
            max
            gap='16'
            className={classNames(cls.NotificationList, {}, [className])}>
            <Skeleton width='300px' border='8px' height='80px'/>
            <Skeleton width='300px' border='8px' height='80px'/>
            <Skeleton width='300px' border='8px' height='80px'/>
        </VStack>;
    }

    return <VStack gap='16'
        max
        className={classNames(cls.NotificationList, {}, [className])}>
        {data?.map(item => (
            <NotificationItem key={item.id} item={item}/>
        ))}
    </VStack>;
});
