import {type ValidationErrors} from '../services/register';

export type RegisterSchema = {
    username: string;
    password: string;
    email: string;
    isLoading: boolean;
    errors?: ValidationErrors;
};
