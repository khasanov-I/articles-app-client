import {type HTMLAttributeAnchorTarget, memo, type ReactNode} from 'react';
import {ArticleView, type Article} from 'entities/Article/model/types/article';
import {classNames} from 'shared/lib/classNames';
import {ArticleListItem} from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import {ArticleListItemSkeleton} from '../ArticleListItem/ArticleListItemSkeleton';
import {Text} from 'shared/ui/Text/Text';
import {useTranslation} from 'react-i18next';
import {List, type ListRowProps, WindowScroller} from 'react-virtualized';
import {PAGE_ID} from 'widgets/Page/ui/Page';

type ArticleListProps = {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    onScrollEnd?: () => void;
};

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3).fill(0)
        .map((item, index) => <ArticleListItemSkeleton
            className={cls.card} key={index} view={view}/>);

export const ArticleList = memo((props: ArticleListProps): ReactNode => {
    const {className = '',
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
        onScrollEnd} = props;

    const {t} = useTranslation();

    const isBig = view === ArticleView.BIG;

    const itemsPerRow = isBig ? 1 : 3;
    const rowCount = Math.ceil(articles.length / itemsPerRow);

    const rowRender = ({index, style, key}: ListRowProps) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

        for (let i = fromIndex; i < toIndex; i += 1) {
            items.push(
                <ArticleListItem
                    article={articles[i]}
                    view={view}
                    target={target}
                    key={`str${i}`}
                    className={cls.card}/>,
            );
        }

        return <div
            key={key}
            style={style}
            className={cls.row}>
            {items}
        </div>;
    };

    if (!isLoading && !articles.length) {
        return <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            <Text title={t('Статьи не найдены')}/>
        </div>;
    }

    // Const renderArticle = (article: Article) =>
    //     <ArticleListItem key={article.id} className={cls.card} article={article} view={view}/>;

    // return <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
    //     {articles.length > 0
    //         ? articles.map(renderArticle)
    //         : undefined}
    //     {isLoading && getSkeletons(view)}
    // </div>;

    return <WindowScroller
        scrollElement={document.getElementById(PAGE_ID) as Element}>
        {({
            height,
            width,
            registerChild,
            onChildScroll,
            isScrolling,
            scrollTop,
        }) => (<div
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            <List
                height={height ?? 700}
                rowCount={rowCount}
                rowHeight={isBig ? 700 : 330}
                rowRenderer={rowRender}
                width={width ? width - 80 : 700}
                autoHeight
                onScroll={onChildScroll}
                isScrolling={isScrolling}
                scrollTop={scrollTop}/>
            {isLoading && getSkeletons(view)}
        </div>)
        }
    </WindowScroller>;
});
