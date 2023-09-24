import {type ReactNode, useState} from 'react';
import {classNames} from 'shared/lib/classNames';
import cls from './Sidebar.module.scss';
import {Button} from 'shared/ui/Button';
import {MenuLogo} from 'shared/assets/icons';
import {ButtonTheme} from 'shared/ui/Button/Button';
import {ThemeSwitcher} from 'widgets/ThemeSwitcher/ui/ThemeSwitcher';
import {LangSwitcher} from 'widgets/LangSwitcher/LangSwitcher';

type SidebarProps = {
    className?: string;
};

export function Sidebar(props: SidebarProps): ReactNode {
    const {className = ''} = props;

    const [collapsed, setCollapsed] = useState(false);

    function toggle() {
        setCollapsed(prev => !prev);
    }

    return (
        <div
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
            <Button theme={ButtonTheme.IMAGE_BUTTON} onClick={toggle}>
                <img src={MenuLogo as string}></img>
            </Button>
            <ThemeSwitcher />
            <LangSwitcher />
        </div>
    );
}
