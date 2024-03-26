import {type RouteProps} from 'react-router-dom';
import {type UserRole} from '../const/user';

export type AppRouterProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};
