import {type ReactNode, useState, useCallback, memo, Suspense} from 'react';
import cls from './Navbar.module.scss';
import {useTranslation} from 'react-i18next';
import {Button} from '@/shared/ui/Button/Button';
import {ButtonTheme} from '@/shared/ui/Button/Button';
import {LoginModal} from '@/features/AuthByUsername';
import {useSelector} from 'react-redux';
import {getUserAuthData} from '@/entities/User';
import {AppLink} from '@/shared/ui/AppLink/AppLink';
import {HStack} from '@/shared/ui/Stack/HStack/HStack';
import {NotificationButton} from '@/features/notificationButton';
import {AvatarDropdown} from '@/features/avatarDropdown';
import {pagePaths} from '@/shared/const/router';
import {BrowserView, MobileView} from 'react-device-detect';
import {DrawerFormAsync} from '@/features/AuthByUsername';
import {Loader} from '@/shared/ui/Loader/Loader';
import {SwipeableDrawer} from '@mui/material';
import {RegisterModal} from '@/features/Register';

export const Navbar = memo((): ReactNode => {
    const {t} = useTranslation('bars');

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const authData = useSelector(getUserAuthData);

    const onShowRegisterModal = useCallback(() => {
        setIsRegisterModalOpen(true);
    }, []);

    const onCloseRegisterModal = useCallback(() => {
        setIsRegisterModalOpen(false);
    }, []);

    const onShowAuthModal = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    const onCloseAuthModal = useCallback(() => {
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
                <Button theme={ButtonTheme.CLEAR} onClick={onShowAuthModal}>
                    {t('Вход')}
                </Button>
                <Button theme={ButtonTheme.CLEAR} onClick={onShowRegisterModal}>
                    Регистрация
                </Button>
                <BrowserView>
                    <LoginModal isOpen={isAuthModalOpen} onClose={onCloseAuthModal} />
                    <RegisterModal isOpen={isRegisterModalOpen} onClose={onCloseRegisterModal} />
                </BrowserView>
                <MobileView>
                    <SwipeableDrawer anchor='bottom' onOpen={onShowAuthModal} open={isAuthModalOpen} onClose={onCloseAuthModal}>
                        <Suspense fallback={<Loader />}>
                            <DrawerFormAsync />
                        </Suspense>
                    </SwipeableDrawer>
                </MobileView>
            </div>
        </header>
    );
});
