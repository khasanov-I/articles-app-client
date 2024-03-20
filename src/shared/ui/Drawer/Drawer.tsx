import {memo, type ReactNode} from 'react';
import cls from './Drawer.module.scss';
import {classNames, type Mods} from 'shared/lib/classNames';
import {Portal} from '../Portal/Portal';
import {Overlay} from '../Overlay/Overlay';
import {useTheme} from 'app/providers/ThemeProvider';

type DrawerProps = {
    className?: string;
    children?: ReactNode;
    onClose: () => void;
    isOpen?: boolean;
};

export const Drawer = memo((props: DrawerProps): ReactNode => {
    const {className = '', children, isOpen, onClose} = props;

    const {theme} = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
    };

    return <Portal>
        <div className={classNames(cls.Drawer, mods, [className, theme])}>
            <Overlay onClick={onClose}/>
            <div className={cls.content}>
                {children}
            </div>
        </div>
    </Portal>;
});
