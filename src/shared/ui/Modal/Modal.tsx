import {type Mods, classNames} from '@/shared/lib/classNames';
import cls from './Modal.module.scss';
import {type ReactNode} from 'react';
import {Portal} from '../Portal/Portal';
import {Overlay} from '../Overlay/Overlay';
import {useModal} from '@/shared/lib/hooks/useModal';
import {useTheme} from '@/shared/lib/hooks/useTheme';

type ModalProps = {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
};

export function Modal(props: ModalProps): ReactNode {
    const {className = '', children, isOpen, onClose, lazy} = props;

    const mods: Mods = {
        [cls.opened]: isOpen,
    };

    const {isMounted, closeHandler} = useModal({
        isOpen,
        onClose,
    });

    const {theme} = useTheme();

    if (lazy && !isMounted) {
        return null;
    }

    return <Portal>
        <div className={classNames(cls.Modal, mods, [className, theme])}>
            <Overlay onClick={closeHandler}/>
            <div className={classNames(cls.content, {}, [])}>
                {children}
            </div>
        </div>
    </Portal>;
}
