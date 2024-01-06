import {type ReactNode} from 'react';
import cls from './ArticleCodeBlockComponent.module.scss';
import {classNames} from 'shared/lib/classNames';
import {useTranslation} from 'react-i18next';

type ArticleCodeBlockComponentProps = {
    className?: string;
};

export const ArticleCodeBlockComponent = (props: ArticleCodeBlockComponentProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();

    return <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>{t('')}</div>;
};
