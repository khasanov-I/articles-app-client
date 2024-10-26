import {memo, type ReactNode} from 'react';
import {DynamicModuleLoader} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {registerReducer} from '../../model/slice/registerSlice';
import RegisterContent from './RegisterContent';

export type RegisterFormProps = {
    className?: string;
};

const RegisterForm = memo((props: RegisterFormProps): ReactNode => {
    const {className = ''} = props;

    const initialReducers = {
        registerForm: registerReducer,
    };

    return <DynamicModuleLoader reducers={initialReducers}>
        <RegisterContent userAgent='desktop'/>
    </DynamicModuleLoader>;
});

export default RegisterForm;
