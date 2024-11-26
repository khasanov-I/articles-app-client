import {type ArticleType, type ArticleBlockType} from '@/entities/Article';

export type ArticleCreationImageBlock = {
    id: string;
    type: ArticleBlockType.IMAGE;
    title: string;
    src: File;
};

export type ArticleCreationCodeBlock = {
    id: string;
    type: ArticleBlockType.CODE;
    code: string;
};

export type ArticleCreationTextBlock = {
    id: string;
    type: ArticleBlockType.TEXT;
    title: string;
    paragraphs: string;
};

export type ArticleCreationBlock = ArticleCreationCodeBlock | ArticleCreationImageBlock | ArticleCreationTextBlock;

export type ArticleSchema = {
    title: string;
    subtitle: string;
    img?: File;
    type: ArticleType;
    blocks: ArticleCreationBlock[];
};

export type ArticleCreationSchema = {
    isLoading: boolean;
    error?: string;
};
