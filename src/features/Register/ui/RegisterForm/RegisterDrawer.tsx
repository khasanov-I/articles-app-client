import {memo} from 'react';
import {DynamicModuleLoader} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import RegisterContent from './RegisterContent';
import {registerReducer} from '../../model/slice/registerSlice';
import {sendMailReducer} from '../../model/slice/sendMail';

export type RegisterDrawerProps = {
    className?: string;
};

const RegisterDrawer = memo((props: RegisterDrawerProps) => {
    const {className = ''} = props;

    const initialReducers = {
        registerForm: registerReducer,
        sendMail: sendMailReducer,
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <RegisterContent userAgent='mobile'/>
        </DynamicModuleLoader>
    );
});

export default RegisterDrawer;
