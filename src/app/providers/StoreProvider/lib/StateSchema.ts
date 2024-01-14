import {type Reducer, type AnyAction, type CombinedState, type ReducersMapObject, type EnhancedStore} from '@reduxjs/toolkit';
import {type AxiosInstance} from 'axios';
import {type ArticleDetailsSchema} from 'entities/Article';
import {type ProfileSchema} from 'entities/Profile';
import {type UserSchema} from 'entities/User';
import {type AddCommentSchema} from 'features/AddComment';
import {type LoginSchema} from 'features/AuthByUsername';
import {type ArticleDetailsCommentsSchema} from 'pages/ArticlesDetailsPage';
import {type ArticlesPageSchema} from 'pages/ArticlesPage';
import {type NavigateOptions, type To} from 'react-router-dom';

export type StateSchema = {
    user: UserSchema;

    // Async
    profile?: ProfileSchema;
    loginForm?: LoginSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    addComment?: AddCommentSchema;
    articlesPage?: ArticlesPageSchema;
};

export type StateSchemaKey = keyof StateSchema;

export type ReducerManager = {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
};

export type ReduxStoreWithManager = {
    reducerManager?: ReducerManager;
} & EnhancedStore<StateSchema>;

export type ThunkExtraArg = {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
};

export type ThunkConfig<T> = {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
};
