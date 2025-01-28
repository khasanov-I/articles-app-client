import {Page} from '@/widgets/Page';
import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

export default function AboutPage(): ReactNode {
    const {t} = useTranslation('about');

    return <Page>https://github.com/khasanov-I?tab=repositories</Page>;
}
