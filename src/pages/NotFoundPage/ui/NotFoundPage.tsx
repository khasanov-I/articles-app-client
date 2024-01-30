import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import cls from './NotFoundPage.module.scss';
import {Page} from 'widgets/Page/ui/Page';

export function NotFoundPage(): ReactNode {
    const {t} = useTranslation('translation');

    return <Page className={cls.NotFoundPage}>
        <h1>{t('Ой')}</h1>
        {t('Не найдено')}
        <h1>404</h1>
    </Page>;
}
