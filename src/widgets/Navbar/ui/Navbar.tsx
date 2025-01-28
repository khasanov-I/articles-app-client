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
// eslint-disable-next-line kh-i-start-plugin/layer-imports
import {AvatarDropdown} from '@/widgets/avatarDropdown';
import {pagePaths} from '@/shared/const/router';
import {BrowserView, MobileView} from 'react-device-detect';
import {DrawerFormAsync} from '@/features/AuthByUsername';
import {Loader} from '@/shared/ui/Loader/Loader';
import {SwipeableDrawer} from '@mui/material';
import {RegisterDrawerAsync, RegisterModal} from '@/features/Register';
import axios from 'axios';

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
                className={cls.createArticleBtn}
                to={pagePaths.article_create}>
                <span className={cls.text}>Создать статью</span>
            </AppLink>
            <HStack gap='16' className={cls.links}>
                <NotificationButton />
                <AvatarDropdown />
            </HStack>
        </header>;
    }

    const onDeleteHandler = async () => {
        await axios.delete('http://localhost:5000/users');
    };

    return (
        <header className={cls.navbar}>
            <div className={cls.links}>
                <button onClick={onDeleteHandler}>УДАЛИТЬ</button>
                <Button theme={ButtonTheme.CLEAR} onClick={onShowAuthModal}>
                    {t('Вход')}
                </Button>
                <Button theme={ButtonTheme.CLEAR} onClick={onShowRegisterModal}>
                    {t('Регистрация')}
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
                    <SwipeableDrawer anchor='bottom' onOpen={onShowRegisterModal} open={isRegisterModalOpen} onClose={onCloseRegisterModal}>
                        <Suspense fallback={<Loader />}>
                            <RegisterDrawerAsync />
                        </Suspense>
                    </SwipeableDrawer>
                </MobileView>
            </div>
        </header>
    );
});
