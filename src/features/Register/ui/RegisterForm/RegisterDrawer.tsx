import {memo} from 'react';
import {DynamicModuleLoader, type ReducersList} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import RegisterContent from './RegisterContent';
import {registerReducer} from '../../model/slice/registerSlice';
import {sendMailReducer} from '../../model/slice/sendMail';
import {profileReducer} from '@/entities/Profile';

export type RegisterDrawerProps = {
    className?: string;
};

const RegisterDrawer = memo((props: RegisterDrawerProps) => {
    const {className = ''} = props;

    const initialReducers: ReducersList = {
        registerForm: registerReducer,
        sendMail: sendMailReducer,
        profile: profileReducer,
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <RegisterContent userAgent='mobile'/>
        </DynamicModuleLoader>
    );
});

export default RegisterDrawer;
