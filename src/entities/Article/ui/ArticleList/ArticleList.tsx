import {memo, useCallback, type ReactNode} from 'react';
import {ArticleView, type Article} from 'entities/Article/model/types/article';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import {ArticleListItem} from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import {ArticleListItemSkeleton} from '../ArticleListItem/ArticleListItemSkeleton';

type ArticleListProps = {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
};

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3).fill(0)
        .map((item, index) => <ArticleListItemSkeleton
            className={cls.card} key={index} view={view}/>);

export const ArticleList = memo((props: ArticleListProps): ReactNode => {
    const {className = '', articles, isLoading, view = ArticleView.SMALL} = props;

    const renderArticle = (article: Article) =>
        <ArticleListItem key={article.id} className={cls.card} article={article} view={view}/>;

    const {t} = useTranslation();

    if (isLoading) {
        return <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {getSkeletons(view)}
        </div>;
    }

    return <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {articles.length > 0
            ? articles.map(renderArticle)
            : undefined}
    </div>;
});
