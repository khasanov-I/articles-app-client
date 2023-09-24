import {type ReactNode} from 'react';
import cls from './Navbar.module.scss';
import {pagePaths} from 'shared/lib/routeConfig';
import {AppLink} from 'shared/ui/AppLink';
import {useTranslation} from 'react-i18next';

export function Navbar(): ReactNode {
    const {t} = useTranslation('bars');
    return (
        <div className={cls.navbar}>
            <div className={cls.links}>
                <AppLink to={pagePaths.main}>{t('Главная')}</AppLink>
                <AppLink to={pagePaths.about}>{t('О сайте')}</AppLink>
            </div>
        </div>
    );
}
