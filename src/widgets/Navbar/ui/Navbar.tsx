import {type ReactNode, useState, useCallback, memo} from 'react';
import cls from './Navbar.module.scss';
import {useTranslation} from 'react-i18next';
import {Button} from '@/shared/ui/Button/Button';
import {ButtonTheme} from '@/shared/ui/Button/Button';
import {LoginModal} from '@/features/AuthByUsername';
import {useSelector} from 'react-redux';
import {getUserAuthData} from '@/entities/User';
import {AppLink} from '@/shared/ui/AppLink/AppLink';
import {pagePaths} from '@/shared/lib/routeConfig';
import {HStack} from '@/shared/ui/Stack/HStack/HStack';
import {NotificationButton} from '@/features/notificationButton';
import {AvatarDropdown} from '@/features/avatarDropdown';

export const Navbar = memo((): ReactNode => {
    const {t} = useTranslation('bars');

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const authData = useSelector(getUserAuthData);

    const onShowModal = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

    if (authData) {
        return <header className={cls.navbar}>
            <AppLink
                to={pagePaths.article_create}>
                {'Создать статью'}
            </AppLink>
            <HStack gap='16' className={cls.links}>
                <NotificationButton />
                <AvatarDropdown />
            </HStack>
        </header>;
    }

    return (
        <header className={cls.navbar}>
            <div className={cls.links}>
                <Button theme={ButtonTheme.CLEAR} onClick={onShowModal}>
                    {t('Вход')}
                </Button>
                <LoginModal isOpen={isAuthModalOpen} onClose={onCloseModal} />
            </div>
        </header>
    );
});
