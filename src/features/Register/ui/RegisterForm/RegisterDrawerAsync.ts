import {type FC, lazy} from 'react';
import {type RegisterDrawerProps} from './RegisterDrawer';

export const RegisterDrawerAsync = lazy<FC<RegisterDrawerProps>>(async () => import('./RegisterDrawer'));
