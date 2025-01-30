import {type ReactNode, Suspense, useCallback, useEffect, useState} from 'react';
import {AppRouter} from './providers/AppRouter';
import {useDispatch} from 'react-redux';
import {userActions} from '@/entities/User';
import {useTheme} from '@/shared/lib/hooks/useTheme';
import {checkAuth} from '@/features/Register';
import {USER_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';
import {useAppDispatch} from './providers/StoreProvider';
import {NotificationNode} from '@/shared/ui/Notification/Notification';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';
import {type Notification} from '@/features/Register';

export function App(): ReactNode {
    const {theme} = useTheme();

    const appDispatch = useAppDispatch();
    const dispatch = useDispatch();

    const [notificationOn, setNotificationOn] = useState<Notification | undefined>(undefined);
    const onChangeNotificationOn = useCallback((message: Notification) => {
        setNotificationOn(message);
        setTimeout(() => {
            setNotificationOn(undefined);
        }, 10000);
    }, []);

    useEffect(() => {
        if (localStorage.getItem(USER_LOCAL_STORAGE_KEY)) {
            void appDispatch(checkAuth(onChangeNotificationOn));
        }

        dispatch(userActions.setInited(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`app ${theme}`}>
            <Suspense>
                <AppRouter />
            </Suspense>
            {notificationOn ? <NotificationNode>
                <VStack>
                    <span>{notificationOn.title}</span>
                    <span>{notificationOn.description}</span>
                    <a href={notificationOn.href} target='_blank' rel='noreferrer'>{notificationOn.href}</a>
                </VStack>
            </NotificationNode> : null}
        </div>
    );
}
