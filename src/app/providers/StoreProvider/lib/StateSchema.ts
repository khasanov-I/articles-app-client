import {type Reducer, type AnyAction, type CombinedState, type ReducersMapObject, type EnhancedStore} from '@reduxjs/toolkit';
import {type AxiosInstance} from 'axios';
import {type ArticleDetailsSchema} from '@/entities/Article';
import {type UserSchema} from '@/entities/User';
import {type AddCommentSchema} from '@/features/AddComment';
import {type LoginSchema} from '@/features/AuthByUsername';
import {type ScrollRestorationSchema} from '@/features/UI';
import {type ArticlesPageSchema} from '@/pages/ArticlesPage';
import {type rtkApi} from '@/shared/api/rtkApi';
import {type RegisterSchema} from '@/features/Register';
import {type SendMailSchema} from '@/features/Register';
import {type ProfileSchema} from '@/entities/Profile';
import {type ArticleCreationSchema} from '@/pages/ArticleEditPage';
import {type ArticleDetailsCommentsSchema} from '@/pages/ArticlesDetailsPage';
import {type ProfileArticleListSchema} from '@/pages/ProfilePage';
import {type NotificationSchema} from '@/entities/Notification';

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
    registerForm?: RegisterSchema;
    sendMail?: SendMailSchema;
    articleCreate?: ArticleCreationSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    articleProfile?: ProfileArticleListSchema;
    notification?: NotificationSchema;
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
