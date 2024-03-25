import {memo, useCallback, type ReactNode} from 'react';
import {Dropdown} from '@/shared/ui/Popups';
import {Avatar} from '@/shared/ui/Avatar/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import {getUserAuthData, isUserAdmin, isUserManager, userActions} from '@/entities/User';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {pagePaths} from '@/shared/const/router';

type AvatarDropdowmProps = {
    className?: string;
};

export const AvatarDropdown = memo((props: AvatarDropdowmProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation('bars');

    const dispatch = useDispatch();

    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const isAdminPanelAvailable = isAdmin ?? isManager;

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return <Dropdown
        className={classNames('', {}, [className])}
        trigger={<Avatar size={30} src={authData?.avatar}/>}
        direction='bottom left'
        items={[
            ...(isAdminPanelAvailable ? [
                {
                    content: t('Админка'),
                    href: pagePaths.admin_panel,
                },
            ] : []),
            {
                content: t('Моя страница'),
                href: pagePaths.profile + authData?.id,
            },
            {
                content: t('Выход'),
                onClick: onLogout,
            },
        ]}
    />;
});
