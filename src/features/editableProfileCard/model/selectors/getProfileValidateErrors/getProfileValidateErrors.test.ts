import {type StateSchema} from 'app/providers/StoreProvider';
import {getProfileValidateErrors} from './getProfileValidateErrors';
import { ValidateProfileError } from '../../consts/consts';

describe('getProfileValidateErrors.test', () => {
    test('should return validate errors', () => {
        const validateErrors = [ValidateProfileError.INCORRECT_AGE];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema))
            .toEqual(validateErrors);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
