import {type StoryFn} from '@storybook/react';
import {type StateSchema, StoreProvider} from 'app/providers/StoreProvider';
import {articleDetailsReducer} from 'entities/Article/model/slice/articleDetailsSlice';
import {profileReducer} from 'entities/Profile';
import {addCommentReducer} from 'features/AddComment/model/slice/addCommentSlice';
import {loginReducer} from 'features/AuthByUsername/model/slice/loginSlice';
import {articleDetailsCommentsReducer} from 'pages/ArticlesDetailsPage';
import {type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addComment: addCommentReducer,
    articleDetailsComments: articleDetailsCommentsReducer,
};

export const reduxDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (Comp: StoryFn) =>
        <StoreProvider initialState={state} asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
            <Comp />
        </StoreProvider>;
