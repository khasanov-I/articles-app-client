import {TestAsyncThunk} from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import {fetchNextArticlesPage} from './fetchNextArticlesPage';
import {fetchArticlesList} from '../fetchArticlesList/fetchArticlesList';
import {ArticleView} from 'entities/Article';
import {ArticleOrder, ArticleSort, ArticleType} from 'entities/Article/model/types/article';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                isLoading: false,
                hasMore: true,
                view: ArticleView.BIG,
                _inited: false,
                order: ArticleOrder.ASC,
                sort: ArticleSort.TITLE,
                search: '',
                limit: 5,
                type: ArticleType.ALL,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toHaveBeenCalled();
    });

    test('fetchArticlesList not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                isLoading: false,
                hasMore: false,
                view: ArticleView.BIG,
                _inited: false,
                order: ArticleOrder.ASC,
                sort: ArticleSort.TITLE,
                search: '',
                limit: 5,
                type: ArticleType.ALL,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
