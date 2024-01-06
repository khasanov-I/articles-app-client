import {type ReactNode, Suspense, useEffect} from 'react';
import {AppRouter} from './providers/AppRouter';
import {Navbar} from 'widgets/Navbar';
import {useTheme} from './providers/ThemeProvider';
import {Sidebar} from 'widgets/Sidebar';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInited, userActions} from 'entities/User';

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
                    {inited ? <AppRouter /> : undefined}
                </div>
            </Suspense>
        </div>
    );
}
