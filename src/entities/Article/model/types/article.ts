import {type User} from 'entities/User';

export enum ArticleBlockType {
    TEXT = 'TEXT',
    CODE = 'CODE',
    IMAGE = 'IMAGE',
}

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

export enum ArticleType {
    ALL = 'ALL',
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
}

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL',
}

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

export enum ArticleSort {
    VIEWS = 'views',
    TITLE = 'title',
    CREATEDAT = 'createdAt',
}

export enum ArticleOrder {
    ASC = 'asc',
    DESC = 'desc',
}
