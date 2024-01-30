import {memo, useMemo, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import cls from './ArticleSortSelector.module.scss';
import {classNames} from 'shared/lib/classNames';
import {Select, type SelectOption} from 'shared/ui/Select/Select';
import {ArticleOrder, ArticleSort} from 'entities/Article/model/types/article';

type ArticleSortSelectProps = {
    className?: string;
    sort: ArticleSort;
    order: ArticleOrder;
    onChangeOrder: (order: ArticleOrder) => void;
    onChangeSort: (sort: ArticleSort) => void;
};

export const ArticleSortSelect = memo((props: ArticleSortSelectProps): ReactNode => {
    const {className = '', sort, order, onChangeOrder, onChangeSort} = props;

    const {t} = useTranslation();

    const orderOptions = useMemo<Array<SelectOption<ArticleOrder>>>(() => [
        {
            value: ArticleOrder.ASC,
            content: t('возрастанию'),
        },
        {
            value: ArticleOrder.DESC,
            content: t('убыванию'),
        },
    ], [t]);

    const sortOptions = useMemo<Array<SelectOption<ArticleSort>>>(() => [
        {
            value: ArticleSort.TITLE,
            content: t('названию'),
        },
        {
            value: ArticleSort.VIEWS,
            content: t('просмотрам'),
        },
        {
            value: ArticleSort.CREATEDAT,
            content: t('дате'),
        },
    ], [t]);

    return <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select<ArticleSort>
            options={sortOptions}
            label={t('Сортировать по')}
            value={sort}
            onChange={onChangeSort}/>
        <Select<ArticleOrder>
            options={orderOptions}
            label={t('по')}
            value={order}
            onChange={onChangeOrder}
            className={cls.order}/>
    </div>;
});
