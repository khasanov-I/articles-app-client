import {profileActions, profileReducer} from './profileSlice';
import {Currency} from '@/entities/Currency';
import {Country} from '@/entities/Country';
import {updateProfileData} from '../services/updateProfileData/updateProfileData';
import {type ProfileSchema} from '../types/editableProfileCardSchema';

const data = {
    firstname: 'Ilshat',
    lastname: 'Khasanov',
    age: 21,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Moscow',
    username: 'admin',
};

describe('profileSlice.test', () => {
    test('setReadOnly', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
        };
        expect(profileReducer(state as ProfileSchema,
            profileActions.setReadOnly(true),
        )).toEqual({
            readonly: true,
        });
    });

    test('cancelEdit', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            data,
        };
        expect(profileReducer(state as ProfileSchema,
            profileActions.cancelEdit(),
        )).toEqual({
            readonly: true,
            data,
            form: data,
            validateErrors: undefined,
        });
    });

    test('updateProfile', () => {
        const state: DeepPartial<ProfileSchema> = {form: {
            lastname: 'Khasanov',
        }};
        expect(profileReducer(state as ProfileSchema,
            profileActions.updateProfile({firstname: 'Ilshat'}),
        )).toEqual({
            form: {
                firstname: 'Ilshat',
                lastname: 'Khasanov',
            },
        });
    });

    test('updateProfileData pending', () => {
        const state: DeepPartial<ProfileSchema> = {};
        expect(profileReducer(state as ProfileSchema,
            updateProfileData.pending,
        )).toEqual<DeepPartial<ProfileSchema>>({
            validateErrors: undefined,
            isLoading: true,
        });
    });

    test('updateProfileData fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {};
        expect(profileReducer(state as ProfileSchema,
            updateProfileData.fulfilled(data, ''),
        )).toEqual<DeepPartial<ProfileSchema>>({
            isLoading: false,
            data,
            form: data,
            readonly: true,
        });
    });
});
