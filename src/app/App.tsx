import {type ReactNode, Suspense, Component, FC, useEffect} from 'react';
import {AppRouter} from './providers/AppRouter';
import {Navbar} from 'widgets/Navbar';
import {useTheme} from './providers/ThemeProvider';
import {Sidebar} from 'widgets/Sidebar';
import {useDispatch} from 'react-redux';
import {userActions} from 'entities/User';

export function App(): ReactNode {
    const {theme} = useTheme();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={`app ${theme}`}>
            <Suspense>
                <Navbar />
                <div className='content-page'>
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}
