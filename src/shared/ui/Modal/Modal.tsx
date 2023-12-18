import {type Mods, classNames} from 'shared/lib/classNames';
import cls from './Modal.module.scss';
import {useCallback, type ReactNode, useEffect, useState} from 'react';
import {Portal} from '../Portal/Portal';
import {useTheme} from 'app/providers/ThemeProvider';

type ModalProps = {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
};

export function Modal(props: ModalProps): ReactNode {
    const {className = '', children, isOpen, onClose, lazy} = props;

    const closeHandler = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
    };

    const {theme} = useTheme();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    if (lazy && !isMounted) {
        return null;
    }

    return <Portal>
        <div className={classNames(cls.Modal, mods, [className, theme])}>
            <div className={classNames(cls.overlay, {}, [])} onMouseDown={closeHandler}>
                <div className={classNames(cls.content, {}, [])} onMouseDown={onContentClick}>
                    {children}
                </div>
            </div>
        </div>;
    </Portal>;
}
