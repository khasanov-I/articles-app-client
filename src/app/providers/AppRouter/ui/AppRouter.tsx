import {type ReactNode, Suspense, memo, useCallback} from 'react';
import {Route, Routes} from 'react-router-dom';
import {type AppRouterProps} from '@/shared/types/router';
import {PageLoader} from '@/widgets/PageLoader';
import {RequireAuth} from './RequireAuth';
import {routeConfig} from '../config/routeConfig';

export const AppRouter = memo((): ReactNode => {
    const renderWithWrapper = useCallback((route: AppRouterProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly
                    ? <RequireAuth roles={route.roles}>{element}</RequireAuth>
                    : element}/>
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
});
