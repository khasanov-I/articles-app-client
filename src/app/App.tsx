import {type ReactNode, Suspense, useEffect} from 'react';
import {AppRouter} from './providers/AppRouter';
import {useDispatch} from 'react-redux';
import {userActions} from '@/entities/User';
import {useTheme} from '@/shared/lib/hooks/useTheme';
import {checkAuth} from '@/features/Register';
import {USER_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';
import {useAppDispatch} from './providers/StoreProvider';

export function App(): ReactNode {
    const {theme} = useTheme();

    const appDispatch = useAppDispatch();
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(USER_LOCAL_STORAGE_KEY)) {
            void appDispatch(checkAuth());
        }

        dispatch(userActions.setInited(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`app ${theme}`}>
            <Suspense>
                <AppRouter />
            </Suspense>
        </div>
    );
}
