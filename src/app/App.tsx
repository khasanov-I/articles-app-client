import {type ReactNode, Suspense, useEffect} from 'react';
import {AppRouter} from './providers/AppRouter';
import {Navbar} from '@/widgets/Navbar';
import {Sidebar} from '@/widgets/Sidebar';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInited, userActions} from '@/entities/User';
import {useTheme} from '@/shared/lib/hooks/useTheme';

export function App(): ReactNode {
    const {theme} = useTheme();

    const dispatch = useDispatch();

    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={`app ${theme}`}>
            <Suspense>
                <Navbar />
                <div className='content-page'>
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}
