import {type UserSchema} from 'entities/User';
import {type LoginSchema} from 'features/AuthByUsername';

export type StateSchema = {
    user: UserSchema;
    loginForm: LoginSchema;
};

