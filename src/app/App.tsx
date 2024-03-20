import {type ReactNode, Suspense, useEffect} from 'react';
import {AppRouter} from './providers/AppRouter';
import {Navbar} from '@/widgets/Navbar';
import {useTheme} from './providers/ThemeProvider';
import {Sidebar} from '@/widgets/Sidebar';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInited, userActions} from '@/entities/User';

export function App(): ReactNode {
    const {theme} = useTheme();

    const dispatch = useDispatch();

    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    // Const ar = Array.from(Array(100).keys()).map(e => {
    //     console.log(`{\n"id": "${e + 31}",\n"title": "Javascript news",\n"subtitle": "Что нового в JS за 2022 год?",\n"img": "https://usefulangle.com/img/thumb/javascript.png",\n"views": 1022\,\n"createdAt": "26.02.2022",\n"userId": "1",\n"type": ["IT"],\n"blocks": []\n},`);
    //     return 0;
    // });

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
