import { ReactNode, Suspense } from 'react';
import './styles/index.scss';
import { AppRouter } from './providers/AppRouter';
import { Navbar } from 'widgets/Navbar';
import { useTheme } from './providers/ThemeProvider';
import { Sidebar } from 'widgets/Sidebar';

export function App(): ReactNode {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <Suspense>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}
