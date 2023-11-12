import {getUserAuthData} from './model/selectors/getUserAuthData/getUserAuthData';
import {userActions, userReducer, userSlice} from './model/slice/userSlice';
import {type UserSchema, type User} from './model/types/user';

export {type UserSchema, type User};
export {userActions, userReducer, userSlice, getUserAuthData};
