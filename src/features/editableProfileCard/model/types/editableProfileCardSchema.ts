import {type Profile} from '@/entities/Profile';
import {type ValidateProfileError} from '../consts/consts';

export type ProfileSchema = {
    data?: Profile;
    isLoading: boolean;
    form?: Profile;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
};
