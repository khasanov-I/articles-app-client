import {createSelector} from '@reduxjs/toolkit';
import {type StateSchema} from '@/app/providers/StoreProvider';
import {UserRole} from '@/shared/const/user';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, roles => Boolean(roles?.includes(UserRole.ADMIN)));
export const isUserManager = createSelector(getUserRoles, roles => Boolean(roles?.includes(UserRole.MANAGER)));
