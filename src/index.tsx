import {App} from 'app/App';
import {ThemeProvider} from 'app/providers/ThemeProvider/ui/ThemeProvider';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './i18n';

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);
root.render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
);
