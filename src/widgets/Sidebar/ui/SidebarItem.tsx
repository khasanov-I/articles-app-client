import {memo, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {AppLink} from 'shared/ui/AppLink';
import {Text} from 'shared/ui/Text';
import {type SidebarItemType} from '../model/items';

type SidebarItemProps = {
    item: SidebarItemType;
    collapsed?: boolean;
};

export const SidebarItem = memo((props: SidebarItemProps): ReactNode => {
    const {item, collapsed} = props;

    const {t} = useTranslation('bars');

    return <AppLink to={item?.path}>
        <item.icon className='img'/>
        {collapsed ? undefined : <Text text={t(item.text)} />}
    </AppLink>;
});
