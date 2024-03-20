import {memo, type ReactNode} from 'react';
import cls from './Drawer.module.scss';
import {classNames, type Mods} from '@/shared/lib/classNames';
import {Portal} from '../Portal/Portal';
import {Overlay} from '../Overlay/Overlay';
import {useTheme} from '@/app/providers/ThemeProvider';
import {useModal} from '@/shared/lib/hooks/useModal';

type DrawerProps = {
    className?: string;
    children?: ReactNode;
    onClose: () => void;
    isOpen?: boolean;
    lazy?: boolean;
};

export const Drawer = memo((props: DrawerProps): ReactNode => {
    const {className = '', children, isOpen, onClose, lazy} = props;

    const {isMounted, closeHandler} = useModal({
        isOpen,
        onClose,
    });

    const {theme} = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return <Portal>
        <div className={classNames(cls.Drawer, mods, [className, theme])}>
            <Overlay onClick={closeHandler}/>
            <div className={cls.content}>
                {children}
            </div>
        </div>
    </Portal>;
});
