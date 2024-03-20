import {memo, useState, type ReactNode, useCallback} from 'react';
import cls from './NotificationButton.module.scss';
import {Popover} from 'shared/ui/Popups';
import {Button, ButtonTheme} from 'shared/ui/Button/Button';
import {NotificationLogo} from 'shared/assets/icons';
import {NotificationList} from 'entities/Notification';
import {classNames} from 'shared/lib/classNames';
import {BrowserView, MobileView} from 'react-device-detect';
import {Drawer} from 'shared/ui/Drawer/Drawer';

type NotificationButtonProps = {
    className?: string;
};

export const NotificationButton = memo((props: NotificationButtonProps): ReactNode => {
    const {className = ''} = props;

    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    return <>
        <BrowserView>
            <Popover className={classNames('', {}, [className])}
                trigger={
                    <Button theme={ButtonTheme.IMAGE_BUTTON}>
                        <NotificationLogo className='img'/>
                    </Button>
                }>
                <NotificationList className={cls.notifications}/>
            </Popover>
        </BrowserView>
        <MobileView>
            <Button onClick={onOpenDrawer} theme={ButtonTheme.IMAGE_BUTTON}>
                <NotificationLogo className='img'/>
            </Button>
            <Drawer onClose={onCloseDrawer} isOpen={isOpen}>
                <NotificationList className={cls.notifications}/>
            </Drawer>
        </MobileView>
    </>;
});
