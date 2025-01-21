import {type StateSchema} from '@/app/providers/StoreProvider';

export const getProfileArticles = (state: StateSchema) => state.articleProfile?.articles ?? [];
export const getProfileArticlesError = (state: StateSchema) => state.articleProfile?.error;
export const getProfileArticlesIsLoading = (state: StateSchema) => state.articleProfile?.isLoading;
export const getProfileMounted = (state: StateSchema) => state.articleProfile?.mounted;
