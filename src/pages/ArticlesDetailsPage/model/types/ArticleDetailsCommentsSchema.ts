import {type Comment} from '@/entities/Comment';

export type ArticleDetailsCommentsSchema = {
    isLoading?: boolean;
    error?: string;
    comments: Comment[];
};
