import {type ArticleBlock} from '@/entities/Article';

export type ArticleType = 'IT' | 'SCIENCE' | 'ALL' | 'ECONOMICS';

export type ArticleCreateSchema = {
    title: string;
    subtitle: string;
    img: string;
    views: string;
    createdAt: string;
    type: ArticleType;
    blocks: ArticleBlock[];
};
