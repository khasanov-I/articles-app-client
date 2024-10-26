import {type StateSchema} from '@/app/providers/StoreProvider';

export const getRegisterError = (state: StateSchema) => state?.registerForm?.error;
export const getRegisterIsLoading = (state: StateSchema) => state?.registerForm?.isLoading;
export const getRegisterUsername = (state: StateSchema) => state?.registerForm?.username ?? '';
export const getRegisterPassword = (state: StateSchema) => state?.registerForm?.password ?? '';
export const getRegisterAvatar = (state: StateSchema) => state?.registerForm?.avatar ?? '';
export const getRegisterEmail = (state: StateSchema) => state?.registerForm?.email ?? '';

