import {type StateSchema} from '@/app/providers/StoreProvider';
import {Country} from '@/entities/Country';
import {Currency} from '@/entities/Currency';
import {getProfileForm} from './getProfileForm';

describe('getProfileForm.test', () => {
    test('should return form', () => {
        const form = {
            firstname: 'Ilshat',
            lastname: 'Khasanov',
            age: 21,
            currency: Currency.RUB,
            country: Country.Russia,
            city: 'Moscow',
            username: 'admin',
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                form,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(form);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
