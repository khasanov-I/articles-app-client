import { ReactNode, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/lib/routeConfig';

export function AppRouter(): ReactNode {
  return (
    <div className="AppRouter">
      <Suspense>
        <Routes>
          {Object.values(routeConfig).map(({ path, element }) => {
            return <Route key={path} path={path} element={element} />;
          })}
        </Routes>
      </Suspense>
    </div>
  );
}
