import {type StoryFn} from '@storybook/react';
import {type StateSchema, StoreProvider} from 'app/providers/StoreProvider';
import {articleDetailsReducer} from 'entities/Article/model/slice/articleDetailsSlice';
import {addCommentReducer} from 'features/AddComment/model/slice/addCommentSlice';
import {loginReducer} from 'features/AuthByUsername/model/slice/loginSlice';
import {profileReducer} from 'features/editableProfileCard/model/slice/profileSlice';
import {articleDetailsPageReducer} from 'pages/ArticlesDetailsPage/model/slices';
import {type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addComment: addCommentReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

export const reduxDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (Comp: StoryFn) =>
        <StoreProvider initialState={state} asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
            <Comp />
        </StoreProvider>;
