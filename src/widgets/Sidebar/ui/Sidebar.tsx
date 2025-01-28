import {type ReactNode, useState, useMemo, memo} from 'react';
import {classNames} from '@/shared/lib/classNames';
import cls from './Sidebar.module.scss';
import {Button} from '@/shared/ui/Button/Button';
import {MenuLogo} from '@/shared/assets/icons';
import {ButtonTheme} from '@/shared/ui/Button/Button';
import {SidebarItem} from './SidebarItem';
import {useSelector} from 'react-redux';
import {getSidebarItems} from '../model/selectors/getSidebarItems';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';
import {ThemeSwitcher} from '@/features/ThemeSwitcher';
import {LangSwitcher} from '@/features/LangSwitcher';

type SidebarProps = {
    className?: string;
};

export const Sidebar = memo((props: SidebarProps): ReactNode => {
    const {className = ''} = props;

    const SidebarItemsList = useSelector(getSidebarItems);

    const [collapsed, setCollapsed] = useState(false);

    const itemsList = useMemo(() => SidebarItemsList.map(item =>
        <SidebarItem
            item={item}
            key={item.path}
            collapsed={collapsed}/>), [collapsed, SidebarItemsList]);

    function toggle() {
        setCollapsed(prev => !prev);
    }

    return (
        <aside data-testid='sidebar'
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
            <Button data-testid='sidebar-toggle' theme={ButtonTheme.IMAGE_BUTTON} onClick={toggle}>
                <MenuLogo className='img'/>
            </Button>
            <VStack className={cls.links} role='navigation' gap='32'>
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </aside>
    );
});
