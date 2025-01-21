import {type Article} from '@/entities/Article';

export type ProfileArticleListSchema = {
    isLoading: boolean;
    error?: string;
    articles: Article[];
    mounted: boolean;
};
