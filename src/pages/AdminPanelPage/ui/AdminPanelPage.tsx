import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {Page} from 'widgets/Page/ui/Page';

export default function AdminPanelPage(): ReactNode {
    const {t} = useTranslation('about');

    return <Page>{t('Админ панель')}</Page>;
}
