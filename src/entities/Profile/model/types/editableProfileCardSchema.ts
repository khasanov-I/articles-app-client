import {type Country} from '@/entities/Country';
import {type Currency} from '@/entities/Currency';

export type Profile = {
    id?: string;
    firstname?: string;
    lastname?: string;
    age?: string;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
};

export type ProfileSchema = {
    data?: Profile;
    isLoading: boolean;
    error?: string;
    canEdit: boolean;
};
