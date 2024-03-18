import {memo, type ReactNode} from 'react';
import cls from './NotificationButton.module.scss';
import {Popover} from 'shared/ui/Popups';
import {Button, ButtonTheme} from 'shared/ui/Button/Button';
import {NotificationLogo} from 'shared/assets/icons';
import {NotificationList} from 'entities/Notification';
import {classNames} from 'shared/lib/classNames';

type NotificationButtonProps = {
    className?: string;
};

export const NotificationButton = memo((props: NotificationButtonProps): ReactNode => {
    const {className = ''} = props;

    return <Popover className={classNames('', {}, [className])} trigger={
        <Button theme={ButtonTheme.IMAGE_BUTTON}>
            <NotificationLogo className='img'/>
        </Button>
    }>
        <NotificationList className={cls.notifications}/>
    </Popover>;
});
