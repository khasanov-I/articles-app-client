import {memo, type ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {getArticles} from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import {getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView} from 'pages/ArticlesPage/model/selectors/articlesPageSelector';
import {classNames} from 'shared/lib/classNames';
import {ArticleList} from 'entities/Article';
import {Text, TextTheme} from 'shared/ui/Text/Text';
import {useTranslation} from 'react-i18next';

type ArticlesInfiniteListProps = {
    className?: string;
};

export const ArticlesInfiniteList = memo((props: ArticlesInfiniteListProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();

    const articles = useSelector(getArticles.selectAll);

    const error = useSelector(getArticlesPageError);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    if (error) {
        return <Text
            theme={TextTheme.ERROR}
            text={t('Ошибка при загрузке статей')} />;
    }

    return <div className={classNames('', {}, [className])}>
        <ArticleList
            className={className}
            articles={articles}
            view={view}
            isLoading={isLoading}/>
    </div>;
});
