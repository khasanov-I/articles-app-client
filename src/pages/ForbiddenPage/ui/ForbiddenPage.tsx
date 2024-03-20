import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {Page} from '@/widgets/Page/ui/Page';

export default function ForbiddenPage(): ReactNode {
    const {t} = useTranslation('about');

    return <Page>{t('У вас нет доступа к этой странице')}</Page>;
}
