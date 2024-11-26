import {createRoot} from 'react-dom/client';
import {App} from '@/app/App';
import {ThemeProvider} from '@/app/providers/ThemeProvider/ui/ThemeProvider';
import './i18n';
import {ErrorBoundary} from '@/app/providers/ErrorBoundary';
import './app/styles/index.scss';
import {StoreProvider} from '@/app/providers/StoreProvider';

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);
root.render(
    <StoreProvider>
        <ErrorBoundary>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </StoreProvider>,
);
