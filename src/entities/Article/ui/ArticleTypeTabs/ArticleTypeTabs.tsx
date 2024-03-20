import {memo, useMemo, type ReactNode} from 'react';
import {classNames} from '@/shared/lib/classNames';
import {useTranslation} from 'react-i18next';
import {Tabs, type TabItem} from '@/shared/ui/Tabs/Tabs';
import { ArticleType } from '@/entities/Article/model/consts/consts';

type ArticleTypeTabsProps = {
    className?: string;
    value: ArticleType;
    onChangeType: (tab: TabItem<ArticleType>) => void;
};

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps): ReactNode => {
    const {className = '', value, onChangeType} = props;

    const {t} = useTranslation();

    const typeTabs = useMemo<Array<TabItem<ArticleType>>>(() =>
        [
            {
                value: ArticleType.ALL,
                content: t('Все статьи'),
            },
            {
                value: ArticleType.IT,
                content: t('Айти'),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t('Экономика'),
            },
            {
                value: ArticleType.SCIENCE,
                content: t('Наука'),
            },
        ], [t]);

    return <Tabs
        tabs={typeTabs}
        value={value}
        onTabClick={onChangeType}
        className={classNames('', {}, [className])}/>;
});
