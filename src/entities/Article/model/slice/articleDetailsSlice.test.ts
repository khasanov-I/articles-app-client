import {articleDetailsReducer} from './articleDetailsSlice';
import {fetchArticleById} from '../services/fetchArticleById/fetchArticleById';
import {type ArticleDetailsSchema} from '../types/articleDetailsSchema';
import {type Article} from '../types/article';
import {ArticleType} from '../consts/consts';
import {ArticleBlockType} from '../consts/consts';

const article: Article = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://usefulangle.com/img/thumb/javascript.png',

    views: 1022,
    createdAt: '26.02.2022',
    type: ArticleType.IT,
    authorAvatar: '',
    authorUsername: '',
    profileId: 1,
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs:
                'JavaScript — это язык, программы на котором можно выполнять в разных средах.',
        },
        {
            id: '4',
            type: ArticleBlockType.CODE,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id=\'hello\'></p>\n    <script>\n      document.getElementById(\'hello\').innerHTML = \'Hello, world!\';\n    </script>\n  </body>\n</html>',
        },
        {
            id: '5',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs:
                'Здесь нас больше всего интересует строчка document.getElementById(\'hello\').innerHTML = \'Hello, world!\';,',
        },
        {
            id: '2',
            type: ArticleBlockType.IMAGE,
            src: 'https://usefulangle.com/img/thumb/javascript.png',
            title: 'Рисунок 1 - логотип Javascript',
        },
        {
            id: '3',
            type: ArticleBlockType.CODE,
            code: 'console.log(\'Hello, World!\');',
        },
    ],
};

describe('articleDetailsSlice.test', () => {
    test('fetchArticleById pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {};
        expect(articleDetailsReducer(state as ArticleDetailsSchema,
            fetchArticleById.pending,
        )).toEqual<ArticleDetailsSchema>({
            isLoading: true,
            error: undefined,
        });
    });

    test('fetchArticleById fulfilled', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {};
        expect(articleDetailsReducer(state as ArticleDetailsSchema,
            fetchArticleById.fulfilled(article, '', ''),
        )).toEqual<ArticleDetailsSchema>({
            isLoading: false,
            data: article,
        });
    });

    test('fetchArticleById rejected', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {};
        expect(articleDetailsReducer(state as ArticleDetailsSchema,
            fetchArticleById.rejected(new Error(), '', '', 'error'),
        )).toEqual<ArticleDetailsSchema>({
            isLoading: false,
            error: 'error',
        });
    });
});
