import {memo, type ReactNode} from 'react';
import cls from './NotificationItem.module.scss';
import {classNames} from 'shared/lib/classNames';
import {type Notification} from '../../model/types/notification';
import {Card} from 'shared/ui/Card/Card';
import {Text} from 'shared/ui/Text/Text';

type NotificationItemProps = {
    className?: string;
    item: Notification;
};

export const NotificationItem = memo((props: NotificationItemProps): ReactNode => {
    const {className = '', item} = props;

    const content = <Card
        className={classNames(cls.NotificationItem, {}, [className])}>
        <Text title={item.title} text={item.description}/>
    </Card>;

    if (item.href) {
        return <a className={cls.link} href={item.href} target='_blank' rel='noreferrer'>
            {content}
        </a>;
    }

    return content;
});
