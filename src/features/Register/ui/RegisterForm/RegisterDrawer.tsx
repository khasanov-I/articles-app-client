import {memo} from 'react';
import {DynamicModuleLoader} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import RegisterContent from './RegisterContent';
import {registerReducer} from '../../model/slice/registerSlice';

export type RegisterDrawerProps = {
    className?: string;
};

const RegisterDrawer = memo((props: RegisterDrawerProps) => {
    const {className = ''} = props;

    const initialReducers = {
        registerForm: registerReducer,
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <RegisterContent userAgent='mobile'/>
        </DynamicModuleLoader>
    );
});

export default RegisterDrawer;
