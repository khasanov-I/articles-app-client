import {memo} from 'react';
import {loginReducer} from '../../model/slice/loginSlice';
import {DynamicModuleLoader} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import LoginContent from './LoginContent';

export type DrawerFormProps = {
    className?: string;
};

const DrawerForm = memo((props: DrawerFormProps) => {
    const {className = ''} = props;

    const initialReducers = {
        loginForm: loginReducer,
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <LoginContent userAgent='mobile'/>
        </DynamicModuleLoader>
    );
});

export default DrawerForm;
