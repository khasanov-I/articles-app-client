import {useTranslation} from 'react-i18next';
import cls from './ArticleImageBlockComponent.module.scss';
import {classNames} from 'shared/lib/classNames';
import {type ReactNode} from 'react';

type ArticleImageBlockComponentProps = {
    className?: string;
};

export const ArticleImageBlockComponent = (props: ArticleImageBlockComponentProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();

    return <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>{t('')}</div>;
};
