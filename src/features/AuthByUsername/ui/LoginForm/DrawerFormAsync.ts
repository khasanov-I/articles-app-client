import {type FC, lazy} from 'react';
import {type DrawerFormProps} from './DrawerForm';

export const DrawerFormAsync = lazy<FC<DrawerFormProps>>(async () => import('./DrawerForm'));
