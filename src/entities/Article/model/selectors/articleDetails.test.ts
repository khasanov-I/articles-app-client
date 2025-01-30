import {type StateSchema} from '@/app/providers/StoreProvider';
import {type Article} from '../types/article';
import {ArticleType} from '../consts/consts';
import {ArticleBlockType} from '../consts/consts';
import {getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading} from './articleDetails';

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

describe('articleDetails.test', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: article,
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(article);
    });
    test('should work with empty state data', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should return empty state isLoading', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
    });
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error',
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual('error');
    });
    test('should return empty state error', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
});
