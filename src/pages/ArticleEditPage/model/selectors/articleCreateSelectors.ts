import {type StateSchema} from '@/app/providers/StoreProvider';

export const getArticleCreationIsLoading = (state: StateSchema) => state.articleCreate?.isLoading;
export const getArticleCreationError = (state: StateSchema) => state.articleCreate?.error;
