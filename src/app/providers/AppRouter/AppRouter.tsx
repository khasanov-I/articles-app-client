import {getUserAuthData} from 'entities/User';
import {type ReactNode, Suspense, useMemo, memo} from 'react';
import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {routeConfig} from 'shared/lib/routeConfig';
import {PageLoader} from 'widgets/PageLoader';

export const AppRouter = memo((): ReactNode => {
    const isAuth = useSelector(getUserAuthData);

    const routes = useMemo(() => Object
        .values(routeConfig)
        .filter(route => {
            if (route.authOnly && !isAuth) {
                return false;
            }

            return true;
        }), [isAuth]);

    return (
        <div className='AppRouter'>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {routes
                        .map(({path, element}) =>
                            <Route key={path} path={path} element={element} />)}
                </Routes>
            </Suspense>
        </div>
    );
});
