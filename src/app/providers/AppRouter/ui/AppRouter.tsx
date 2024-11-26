import {type ReactNode, Suspense, memo, useCallback} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {type AppRouterProps} from '@/shared/types/router';
import {PageLoader} from '@/widgets/PageLoader';
import {RequireAuth} from './RequireAuth';
import {routeConfig} from '../config/routeConfig';
import {Layout} from './Layout';

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

    const router = createBrowserRouter(createRoutesFromElements(<Route element={<Layout />}>
        {Object.values(routeConfig).map(renderWithWrapper)}
    </Route>));

    return (
        <RouterProvider router={router} />
    );
});
