import {type DeepPartial} from '@reduxjs/toolkit';
import {render} from '@testing-library/react';
import {ErrorBoundary} from 'app/providers/ErrorBoundary';
import {type StateSchema, StoreProvider} from 'app/providers/StoreProvider';
import {ThemeProvider} from 'app/providers/ThemeProvider';
import i18n from 'i18nForTests';
import {type ReactNode} from 'react';
import {I18nextProvider} from 'react-i18next';
import {MemoryRouter} from 'react-router-dom';

type ComponentRenderOptions = {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
};

export const componentRender = (Comp: ReactNode,
    options: ComponentRenderOptions = {}) => {
    const {route = '/', initialState} = options;
    return render(
        <StoreProvider initialState={initialState}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18n}>
                    {Comp}
                </I18nextProvider>
            </MemoryRouter>
        </StoreProvider>,
    );
};
