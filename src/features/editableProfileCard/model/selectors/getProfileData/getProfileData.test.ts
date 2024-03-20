import {type StateSchema} from '@/app/providers/StoreProvider';
import {Country} from '@/entities/Country';
import {Currency} from '@/entities/Currency';
import {getProfileData} from './getProfileData';

const data = {
    firstname: 'Ilshat',
    lastname: 'Khasanov',
    age: 21,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Moscow',
    username: 'admin',
};

describe('getProfileData.test', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
