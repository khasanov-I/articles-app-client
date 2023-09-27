import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import cls from './NotFoundPage.module.scss';
import {NotFound} from 'shared/assets/gifs';

export function NotFoundPage(): ReactNode {
    const {t} = useTranslation('translation');

    return <div className={cls.NotFoundPage}>
        <h1>{t('Ой')}</h1>
        {t('Не найдено')}
        <h1>404</h1>
        <img className={cls.img} src={NotFound as string}/>
    </div>;
}
