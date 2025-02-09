import {classNames} from '@/shared/lib/classNames';
import {Modal} from '@/shared/ui/Modal/Modal';
import {Suspense} from 'react';
import {LoginFormAsync} from '../LoginForm/LoginForm.async';
import {Loader} from '@/shared/ui/Loader/Loader';
import cls from './LoginModal.module.scss';

type LoginModalProps = {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
};

export const LoginModal = (props: LoginModalProps) => {
    const {className = '', isOpen, onClose} = props;

    return <Modal contentClassName={cls.content} className={classNames('', {}, [className])}
        isOpen={isOpen} onClose={onClose} lazy>
        <Suspense fallback={<Loader />}>
            <LoginFormAsync />
        </Suspense>
    </Modal>;
};
