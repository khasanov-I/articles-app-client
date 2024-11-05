import {type FC, lazy} from 'react';
import {type RegisterFormProps} from './RegisterForm';

export const RegisterFormAsync = lazy<FC<RegisterFormProps>>(async () => import('./RegisterForm'));
