import {type Country} from 'entities/Country';
import {type Currency} from 'entities/Currency';

export type Profile = {
    firstname?: string;
    lastname?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
};

export type ProfileSchema = {
    data?: Profile;
    isLoading: boolean;
    form?: Profile;
    error?: string;
    readonly: boolean;
};
