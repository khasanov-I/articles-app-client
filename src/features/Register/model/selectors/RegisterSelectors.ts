import {type StateSchema} from '@/app/providers/StoreProvider';

export const getRegisterErrors = (state: StateSchema) => state?.registerForm?.errors;
export const getRegisterIsLoading = (state: StateSchema) => state?.registerForm?.isLoading;
export const getRegisterUsername = (state: StateSchema) => state?.registerForm?.username ?? '';
export const getRegisterPassword = (state: StateSchema) => state?.registerForm?.password ?? '';
export const getRegisterEmail = (state: StateSchema) => state?.registerForm?.email ?? '';
export const getSendMailLoading = (state: StateSchema) => state?.sendMail?.isLoading;
export const getSendMailErrors = (state: StateSchema) => state?.sendMail?.errors;
export const getSendMailError = (state: StateSchema) => state?.sendMail?.error;
export const getPreventNextClick = (state: StateSchema) => state?.sendMail?.preventNextClick;
