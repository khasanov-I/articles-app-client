import {type StateSchema} from '@/app/providers/StoreProvider';

export const getRegisterErrors = (state: StateSchema) => state?.registerForm?.errors;
export const getRegisterIsLoading = (state: StateSchema) => state?.registerForm?.isLoading;
export const getRegisterUsername = (state: StateSchema) => state?.registerForm?.username ?? '';
export const getRegisterPassword = (state: StateSchema) => state?.registerForm?.password ?? '';
export const getRegisterEmail = (state: StateSchema) => state?.registerForm?.email ?? '';

