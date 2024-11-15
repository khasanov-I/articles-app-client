import {memo, type ReactNode} from 'react';
import {DynamicModuleLoader} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {registerReducer} from '../../model/slice/registerSlice';
import RegisterContent from './RegisterContent';
import {sendMailReducer} from '../../model/slice/sendMail';

export type RegisterFormProps = {
    className?: string;
};

const RegisterForm = memo((props: RegisterFormProps): ReactNode => {
    const {className = ''} = props;

    const initialReducers = {
        registerForm: registerReducer,
        sendMail: sendMailReducer,
    };

    return <DynamicModuleLoader reducers={initialReducers}>
        <RegisterContent userAgent='desktop'/>
    </DynamicModuleLoader>;
});

export default RegisterForm;
