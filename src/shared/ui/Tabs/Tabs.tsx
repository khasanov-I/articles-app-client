import {memo, useCallback, type ReactNode} from 'react';
import cls from './Tabs.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {Card, CardTheme} from '../Card/Card';

export type TabItem<T extends string> = {
    value: T;
    content: ReactNode;
};

export type TabsProps<T extends string> = {
    className?: string;
    tabs: Array<TabItem<T>>;
    value: T;
    onTabClick: (tab: TabItem<T>) => void;
};

export const Tabs = <T extends string>(props: TabsProps<T>): ReactNode => {
    const {className = '', tabs, value, onTabClick} = props;

    const clickHandle = useCallback((tab: TabItem<T>) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return <div className={classNames(cls.Tabs, {}, [className])}>
        {tabs.map(tab =>
            <Card
                theme={tab.value === value
                    ? CardTheme.NORMAL
                    : CardTheme.OUTLINED}
                className={cls.tab}
                key={tab.value}
                onClick={clickHandle(tab)}>
                {tab.content}
            </Card>)}
    </div>;
};
