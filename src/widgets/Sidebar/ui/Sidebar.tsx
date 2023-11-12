import {type ReactNode, useState} from 'react';
import {classNames} from 'shared/lib/classNames';
import cls from './Sidebar.module.scss';
import {Button} from 'shared/ui/Button';
import {AboutLogo, HomeLogo, MenuLogo} from 'shared/assets/icons';
import {ButtonTheme} from 'shared/ui/Button/Button';
import {ThemeSwitcher} from 'widgets/ThemeSwitcher/ui/ThemeSwitcher';
import {LangSwitcher} from 'widgets/LangSwitcher/LangSwitcher';
import {AppLink, LinkTheme} from 'shared/ui/AppLink';
import {pagePaths} from 'shared/lib/routeConfig';
import {useTranslation} from 'react-i18next';
import {Text} from 'shared/ui/Text';

type SidebarProps = {
    className?: string;
};

export function Sidebar(props: SidebarProps): ReactNode {
    const {className = ''} = props;

    const {t} = useTranslation('bars');

    const [collapsed, setCollapsed] = useState(false);

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
            <AppLink theme={LinkTheme.SIDEBAR_LINK} to={pagePaths.main}>
                <HomeLogo className='img'/>
                {collapsed ? undefined : <Text className={cls.text} text={t('Главная')} />}
            </AppLink>
            <AppLink theme={LinkTheme.SIDEBAR_LINK} to={pagePaths.about}>
                <AboutLogo className='img' />
                {collapsed ? undefined : <Text className={cls.text} text={t('О сайте')} />}
            </AppLink>
            <ThemeSwitcher />
            <LangSwitcher />

        </div>
    );
}
