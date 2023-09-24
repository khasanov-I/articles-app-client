import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

export default function MainPage(): ReactNode {
    const {t} = useTranslation('main');

    return <div>{t('Главная')}</div>;
}
