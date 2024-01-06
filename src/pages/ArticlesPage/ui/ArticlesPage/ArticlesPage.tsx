import {memo, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import cls from './ArticlesPage.module.scss';

type ArticlesPageProps = {
    className?: string;
};

const ArticlesPage = (props: ArticlesPageProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();

    return <div className={classNames(cls.ArticlesPage, {}, [className])}>{t('')}</div>;
};

export default memo(ArticlesPage);
