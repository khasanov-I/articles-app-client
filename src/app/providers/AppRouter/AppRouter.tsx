import {type ReactNode, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routeConfig} from 'shared/lib/routeConfig';
import {PageLoader} from 'widgets/PageLoader';

export function AppRouter(): ReactNode {
    return (
        <div className='AppRouter'>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {Object.values(routeConfig).map(({path, element}) => <Route key={path} path={path} element={element} />)}
                </Routes>
            </Suspense>
        </div>
    );
}
