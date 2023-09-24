import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

export default function AboutPage(): ReactNode {
    const {t} = useTranslation('about');

    return <div>{t('О сайте')}</div>;
}
