import {I18nextProvider} from 'react-i18next';
import {render} from '@testing-library/react';
import {type ReactNode} from 'react';
import i18n from 'i18nForTests';

export function renderWithTranslations(component: ReactNode) {
    return render(
        <I18nextProvider i18n={i18n}>
            {component}
        </I18nextProvider>);
}
