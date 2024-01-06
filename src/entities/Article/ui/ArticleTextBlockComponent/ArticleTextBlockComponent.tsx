import {useTranslation} from 'react-i18next';
import cls from './ArticleTextBlockComponent.module.scss';
import {classNames} from 'shared/lib/classNames';
import {type ReactNode} from 'react';

type ArticleTextBlockComponentProps = {
    className?: string;
};

export const ArticleTextBlockComponent = (props: ArticleTextBlockComponentProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();

    return <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>{t('')}</div>;
};
