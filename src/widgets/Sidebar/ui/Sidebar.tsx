import {type ReactNode, useState, useMemo, memo} from 'react';
import {classNames} from 'shared/lib/classNames';
import cls from './Sidebar.module.scss';
import {Button} from 'shared/ui/Button';
import {MenuLogo} from 'shared/assets/icons';
import {ButtonTheme} from 'shared/ui/Button/Button';
import {ThemeSwitcher} from 'widgets/ThemeSwitcher/ui/ThemeSwitcher';
import {LangSwitcher} from 'widgets/LangSwitcher/LangSwitcher';
import {SidebarItemsList} from '../model/items';
import {SidebarItem} from './SidebarItem';

type SidebarProps = {
    className?: string;
};

export const Sidebar = memo((props: SidebarProps): ReactNode => {
    const {className = ''} = props;

    const [collapsed, setCollapsed] = useState(false);

    const itemsList = useMemo(() => SidebarItemsList.map(item =>
        <SidebarItem
            item={item}
            key={item.path}
            collapsed={collapsed}/>), [collapsed]);

    function toggle() {
        setCollapsed(prev => !prev);
    }

    return (
        <div data-testid='sidebar'
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >

            <Button data-testid='sidebar-toggle' theme={ButtonTheme.IMAGE_BUTTON} onClick={toggle}>
                <MenuLogo className='img'/>
            </Button>
            {itemsList}
            <ThemeSwitcher />
            <LangSwitcher />
        </div>
    );
});
