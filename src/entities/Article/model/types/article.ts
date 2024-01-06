enum ArticleBlockType {
    TEXT = 'TEXT',
    CODE = 'CODE',
    IMAGE = 'IMAGE',
}

type ArticleImageBlock = {
    id: string;
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
};

type ArticleCodeBlock = {
    id: string;
    type: ArticleBlockType.CODE;
    code: string;
};

type ArticleTextBlock = {
    id: string;
    type: ArticleBlockType.TEXT;
    title: string;
    paragraphs: string[];
};

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

enum ArticleType {
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
}

export type Article = {
    id: string;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
};
