import {useDispatch} from 'react-redux';
import {type createReduxStore} from './store';
import {configureStore} from '@reduxjs/toolkit';

// Infer the `RootState` and `AppDispatch` types from the store itself
const store = configureStore({
    reducer: {},
});
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
