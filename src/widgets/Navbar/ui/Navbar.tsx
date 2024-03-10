import {type ReactNode, useState, useCallback, memo} from 'react';
import cls from './Navbar.module.scss';
import {useTranslation} from 'react-i18next';
import {Button} from 'shared/ui/Button/Button';
import {ButtonTheme} from 'shared/ui/Button/Button';
import {LoginModal} from 'features/AuthByUsername';
import {useDispatch, useSelector} from 'react-redux';
import {getUserAuthData, userActions} from 'entities/User';
import {AppLink} from 'shared/ui/AppLink/AppLink';
import {pagePaths} from 'shared/lib/routeConfig';
import {Dropdown} from 'shared/ui/Dropdown/Dropdown';
import {Avatar} from 'shared/ui/Avatar/Avatar';

export const Navbar = memo((): ReactNode => {
    const {t} = useTranslation('bars');

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const dispatch = useDispatch();

    const authData = useSelector(getUserAuthData);

    const onShowModal = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

    const onLogout = useCallback(() => {
        onCloseModal();
        dispatch(userActions.logout());
    }, [dispatch, onCloseModal]);

    if (authData) {
        return <header className={cls.navbar}>
            <AppLink
                to={pagePaths.article_create}>
                {'Создать статью'}
            </AppLink>
            <div className={cls.links}>
                <Dropdown
                    trigger={<Avatar size={30} src={authData.avatar}/>}
                    direction='bottom left'
                    items={[
                        {
                            content: t('Моя страница'),
                            href: pagePaths.profile + authData.id,
                        },
                        {
                            content: t('Выход'),
                            onClick: onLogout,
                        },
                    ]}
                />
            </div>
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
