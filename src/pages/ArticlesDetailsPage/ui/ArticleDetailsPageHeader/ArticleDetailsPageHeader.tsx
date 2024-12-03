import {memo, useCallback, type ReactNode} from 'react';
import cls from './ArticleDetailsPageHeader.module.scss';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {Button} from '@/shared/ui/Button/Button';
import {useNavigate} from 'react-router-dom';
import {pagePaths} from '@/shared/const/router';

type ArticleDetailsPageHeaderProps = {
    className?: string;
};

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();

    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(pagePaths.articles);
    }, [navigate]);

    return <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
        <Button onClick={onBackToList}>
            {t('Назад к списку')}
        </Button>
    </div>;
});
