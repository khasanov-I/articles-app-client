import {memo, useCallback, type ReactNode} from 'react';
import cls from './ArticleDetailsPageHeader.module.scss';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {Button} from '@/shared/ui/Button/Button';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getCanEditArticle} from '@/pages/ArticlesDetailsPage/model/selectors/article';
import {getArticleDetailsData} from '@/entities/Article/model/selectors/articleDetails';
import {pagePaths} from '@/shared/const/router';

type ArticleDetailsPageHeaderProps = {
    className?: string;
};

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();

    const navigate = useNavigate();

    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(pagePaths.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(pagePaths.article_details + article?.id + '/edit');
    }, [navigate, article]);

    return <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
        <Button onClick={onBackToList}>
            {t('Назад к списку')}
        </Button>
        {canEdit && <Button
            className={cls.editBtn}
            onClick={onEditArticle}>
            {t('Редактировать')}
        </Button>}
    </div>;
});
