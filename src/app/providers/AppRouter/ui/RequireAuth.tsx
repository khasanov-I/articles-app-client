import {getUserAuthData, getUserRoles} from '@/entities/User';
import {type UserRole} from '@/shared/const/user';
import {getRouteArticles, getRouteForbidden} from '@/shared/const/router';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';

type RequireAuthProps = {
    children: JSX.Element;
    roles?: UserRole[];
};

export function RequireAuth(props: RequireAuthProps) {
    const {children, roles} = props;

    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    const userRoles = useSelector(getUserRoles);
    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some(requiredRole => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={getRouteArticles()}
            state={{from: location}} replace/>;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={getRouteForbidden()}
            state={{from: location}} replace/>;
    }

    return children;
}
