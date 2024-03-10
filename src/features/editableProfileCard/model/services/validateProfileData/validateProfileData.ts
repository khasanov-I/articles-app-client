import {type Profile} from 'entities/Profile';
import {ValidateProfileError} from '../../types/editableProfileCardSchema';

export const validateProfileData = (profile?: Profile) => {
    const errors: ValidateProfileError[] = [];

    if (!profile) {
        errors.push(ValidateProfileError.NO_DATA);
        return errors;
    }

    const {firstname, lastname, age, country} = profile;

    if (!firstname || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_COUNTRY);
    }

    return errors;
};
