import {type StoryFn} from '@storybook/react';
import {type StateSchema, StoreProvider} from '@/app/providers/StoreProvider';
import {type ReducersList} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {addCommentReducer} from '@/features/AddComment/testing';
import {articleDetailsReducer} from '@/entities/Article/testing';
import {loginReducer} from '@/features/AuthByUsername/testing';
import {profileReducer} from '@/features/editableProfileCard/testing';
import {articleDetailsPageReducer} from '@/pages/ArticlesDetailsPage/testing';

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
