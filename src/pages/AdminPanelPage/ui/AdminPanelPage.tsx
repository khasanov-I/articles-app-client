import {Page} from '@/widgets/Page';
import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

export default function AdminPanelPage(): ReactNode {
    const {t} = useTranslation('about');

    return <Page>{t('Админ панель')}</Page>;
}
