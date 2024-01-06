import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import cls from './ArticleDetailsPage.module.scss';
import {memo, type ReactNode} from 'react';
import {ArticleDetails} from 'entities/Article';
import {useParams} from 'react-router-dom';

type ArticleDetailsPageProps = {
    className?: string;
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation('article-details');

    const {id} = useParams<{id: string}>();

    if (!id) {
        return <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {t('Статья не найдена')}
        </div>;
    }

    return <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id}/>
    </div>;
};

export default memo(ArticleDetailsPage);
