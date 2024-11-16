import {type StateSchema} from '@/app/providers/StoreProvider';

export const getProfileAge = (state: StateSchema) => state.profile?.data?.age ?? '';
export const getProfileFirstName = (state: StateSchema) => state.profile?.data?.firstname ?? '';
export const getProfileLastName = (state: StateSchema) => state.profile?.data?.lastname ?? '';
export const getProfileCity = (state: StateSchema) => state.profile?.data?.city ?? '';
export const getProfileCountry = (state: StateSchema) => state.profile?.data?.country;
export const getProfileCurrency = (state: StateSchema) => state.profile?.data?.currency;
export const getProfileAvatar = (state: StateSchema) => state.profile?.data?.avatar ?? '';
export const getProfileUsername = (state: StateSchema) => state.profile?.data?.username ?? '';
