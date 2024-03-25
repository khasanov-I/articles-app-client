import {type UserRole} from '@/entities/User/model/consts/consts';
import {type RouteProps} from 'react-router-dom';

export type AppRouterProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};
