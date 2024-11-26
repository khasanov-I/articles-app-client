import {memo, type ReactNode} from 'react';
import {DynamicModuleLoader, type ReducersList} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {registerReducer} from '../../model/slice/registerSlice';
import RegisterContent from './RegisterContent';
import {sendMailReducer} from '../../model/slice/sendMail';
import {profileReducer} from '@/entities/Profile';

export type RegisterFormProps = {
    className?: string;
};

const RegisterForm = memo((props: RegisterFormProps): ReactNode => {
    const {className = ''} = props;

    const initialReducers: ReducersList = {
        registerForm: registerReducer,
        sendMail: sendMailReducer,
        profile: profileReducer,
    };

    return <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        <RegisterContent userAgent='desktop'/>
    </DynamicModuleLoader>;
});

export default RegisterForm;
