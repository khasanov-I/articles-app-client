import {type User} from 'entities/User';
import {type ArticleBlockType} from '../consts/consts';
import {type ArticleType} from '../consts/consts';

export type ArticleImageBlock = {
    id: string;
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
};

export type ArticleCodeBlock = {
    id: string;
    type: ArticleBlockType.CODE;
    code: string;
};

export type ArticleTextBlock = {
    id: string;
    type: ArticleBlockType.TEXT;
    title: string;
    paragraphs: string[];
};

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export type Article = {
    id: string;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    user: User;
    type: ArticleType[];
    blocks: ArticleBlock[];
};

