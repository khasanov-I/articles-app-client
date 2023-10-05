import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// eslint-disable-next-line
i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',

        debug: false,

        interpolation: {
            escapeValue: false, // Not needed for react!!
        },

        resources: {en: {translations: {}}},
    });

export default i18n;
