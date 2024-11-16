import {ProfileCard} from './ui/ProfileCard/ProfileCard';
import {getProfileAge, getProfileAvatar, getProfileCity, getProfileCountry, getProfileCurrency, getProfileFirstName, getProfileLastName, getProfileUsername} from '../../entities/Profile/model/selectors/getProfileData/getProfileData';
import {getProfileError} from '../../entities/Profile/model/selectors/getProfileError/getProfileError';
import {getProfileIsLoading} from '../../entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import {fetchProfileData} from '../../entities/Profile/model/services/fetchProfileData/fetchProfileData';
import {profileActions, profileReducer} from './model/slice/profileSlice';

export type {ProfileSchema} from '../../entities/Profile/model/types/editableProfileCardSchema';
export {getProfileError, getProfileIsLoading, fetchProfileData, profileReducer};
export {ProfileCard, profileActions,
    getProfileAge,
    getProfileFirstName,
    getProfileLastName,
    getProfileCity,
    getProfileCountry,
    getProfileCurrency,
    getProfileAvatar,
    getProfileUsername,
};
