import {classNames} from '@/shared/lib/classNames';
import {Loader} from '@/shared/ui/Loader/Loader';
import {Modal} from '@/shared/ui/Modal/Modal';
import {Suspense, type ReactNode} from 'react';
import cls from './RegisterModal.module.scss';
import {RegisterFormAsync} from '../RegisterForm/RegisterForm.async';

type RegisterModalProps = {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
};

const RegisterModal = (props: RegisterModalProps): ReactNode => {
    const {isOpen, onClose, className} = props;

    return <Modal contentClassName={cls.content} className={classNames('', {}, [className])}
        isOpen={isOpen} onClose={onClose} lazy>
        <Suspense fallback={<Loader />}>
            <RegisterFormAsync />
        </Suspense>
    </Modal>;
};

export default RegisterModal;
