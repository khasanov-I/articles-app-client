import {type Reducer, type AnyAction, type CombinedState, type ReducersMapObject, type EnhancedStore} from '@reduxjs/toolkit';
import {type AxiosInstance} from 'axios';
import {type ArticleDetailsSchema} from '@/entities/Article';
import {type UserSchema} from '@/entities/User';
import {type AddCommentSchema} from '@/features/AddComment';
import {type LoginSchema} from '@/features/AuthByUsername';
import {type ScrollRestorationSchema} from '@/features/UI';
import {type ProfileSchema} from '@/features/editableProfileCard/model/types/editableProfileCardSchema';
import {type ArticleDetailsPageSchema} from '@/pages/ArticlesDetailsPage';
import {type ArticlesPageSchema} from '@/pages/ArticlesPage';
import {type rtkApi} from '@/shared/api/rtkApi';

export type StateSchema = {
    user: UserSchema;
    scrollRestoration: ScrollRestorationSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    // Async
    profile?: ProfileSchema;
    loginForm?: LoginSchema;
    articleDetails?: ArticleDetailsSchema;
    addComment?: AddCommentSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
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
};

export type ThunkConfig<T> = {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
};
