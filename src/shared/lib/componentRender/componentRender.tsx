import {render} from '@testing-library/react';
import {type StateSchema, StoreProvider} from 'app/providers/StoreProvider';
import i18n from 'i18nForTests';
import {type ReactNode} from 'react';
import {I18nextProvider} from 'react-i18next';
import {MemoryRouter} from 'react-router-dom';
import {type ReducersList} from '../dynamicModuleLoader/dynamicModuleLoader';

export type ComponentRenderOptions = {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersList>;
};

export const componentRender = (Comp: ReactNode,
    options: ComponentRenderOptions = {}) => {
    const {route = '/', initialState, asyncReducers} = options;
    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
                <I18nextProvider i18n={i18n}>
                    {Comp}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
};
