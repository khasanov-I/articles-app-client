import {Page} from '@/widgets/Page';
import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

export default function MainPage(): ReactNode {
    const {t} = useTranslation('main');

    return <Page>
        {t('Главная')}
    </Page>;
}
