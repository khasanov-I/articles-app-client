import {memo, useCallback, type ReactNode} from 'react';
import {Dropdown} from '@/shared/ui/Popups';
import {Avatar} from '@/shared/ui/Avatar/Avatar';
import {useSelector} from 'react-redux';
import {getUserAuthData, isUserAdmin, isUserManager} from '@/entities/User';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {getRouteAdmin, getRouteProfile} from '@/shared/const/router';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {logout} from '@/features/Register';
import {getProfileAvatar} from '@/entities/Profile';
import {NoAvatar} from '@/shared/assets/img';

type AvatarDropdowmProps = {
    className?: string;
};

export const AvatarDropdown = memo((props: AvatarDropdowmProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation('bars');

    const appDispatch = useAppDispatch();

    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const isAdminPanelAvailable = isAdmin ?? isManager;

    const avatar = useSelector(getProfileAvatar);

    const onLogout = useCallback(async () => {
        await appDispatch(logout());
    }, [appDispatch]);

    return <Dropdown
        className={classNames('', {}, [className])}
        trigger={<Avatar size={30} src={avatar ? avatar : NoAvatar as string}/>}
        direction='bottom left'
        items={[
            ...(isAdminPanelAvailable ? [
                {
                    content: t('Админка'),
                    href: getRouteAdmin(),
                },
            ] : []),
            {
                content: t('Моя страница'),
                href: authData ? getRouteProfile(authData?.id) : undefined,
            },
            {
                content: t('Выход'),
                onClick: onLogout,
            },
        ]}
    />;
});
