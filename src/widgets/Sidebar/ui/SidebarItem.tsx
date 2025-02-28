import {memo, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {AppLink} from '@/shared/ui/AppLink/AppLink';
import {Text} from '@/shared/ui/Text/Text';
import {type SidebarItemType} from '../model/types/sidebar';
import cls from './SidebarItem.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {getUserAuthData} from '@/entities/User';

type SidebarItemProps = {
    item: SidebarItemType;
    collapsed?: boolean;
};

export const SidebarItem = memo((props: SidebarItemProps): ReactNode => {
    const {item, collapsed} = props;

    const isAuth = useSelector(getUserAuthData);

    const {t} = useTranslation('bars');

    if (!isAuth && item.authOnly) {
        return undefined;
    }

    return <AppLink to={item?.path}>
        <item.icon className='img'/>
        {collapsed ? undefined : <Text className={classNames(cls.text, {[cls.collapsed]: collapsed}, [])} text={t(item.text)} />}
    </AppLink>;
});
