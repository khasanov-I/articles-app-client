import {type ReactNode, useState, useCallback, memo} from 'react';
import cls from './Navbar.module.scss';
import {useTranslation} from 'react-i18next';
import {Button} from 'shared/ui/Button/Button';
import {ButtonTheme} from 'shared/ui/Button/Button';
import {LoginModal} from 'features/AuthByUsername';
import {useDispatch, useSelector} from 'react-redux';
import {getUserAuthData, userActions} from 'entities/User';

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
        return <div className={cls.navbar}>
            <div className={cls.links}>
                <Button theme={ButtonTheme.CLEAR} onClick={onLogout}>
                    {t('Выход')}
                </Button>
            </div>
        </div>;
    }

    return (
        <div className={cls.navbar}>
            <div className={cls.links}>
                <Button theme={ButtonTheme.CLEAR} onClick={onShowModal}>
                    {t('Вход')}
                </Button>
                <LoginModal isOpen={isAuthModalOpen} onClose={onCloseModal} />
            </div>
        </div>
    );
});
