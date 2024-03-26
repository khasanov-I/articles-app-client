import {memo, type ReactNode} from 'react';
import cls from './ArticleEditPage.module.scss';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {useParams} from 'react-router-dom';
import {Page} from '@/widgets/Page';

type ArticleEditPageProps = {
    className?: string;
};

const ArticleEditPage = memo((props: ArticleEditPageProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();
    const {id} = useParams<{id: string}>();
    const isEdit = Boolean(id);

    return <Page
        className={classNames(cls.ArticleEditPage, {}, [className])}>
        {isEdit
            ? 'Редактирование статьи'
            : 'Создание новой статьи'}
    </Page>;
});

export default ArticleEditPage;
