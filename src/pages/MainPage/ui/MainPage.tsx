import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {Page} from 'widgets/Page/ui/Page';

export default function MainPage(): ReactNode {
    const {t} = useTranslation('main');

    return <Page>{t('Главная')}</Page>;
}
