import {memo, useCallback, useState, type ReactNode} from 'react';
import cls from './ArticleEditPage.module.scss';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {useParams} from 'react-router-dom';
import {Page} from '@/widgets/Page';
import {articleCreateReducer} from '../../model/slice/articleCreateSlice';
import {DynamicModuleLoader, type ReducersList} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {ArticleCreateContent} from '../ArticleCreateContent/ArticleCreateContent';
import {HStack} from '@/shared/ui/Stack/HStack/HStack';
import {Button} from '@/shared/ui/Button/Button';

type ArticleEditPageProps = {
    className?: string;
};

const ArticleEditPage = memo((props: ArticleEditPageProps): ReactNode => {
    const {className = ''} = props;

    const {t} = useTranslation();
    const {id} = useParams<{id: string}>();
    const isEdit = Boolean(id);

    const reducers: ReducersList = {
        articleCreate: articleCreateReducer,
    };

    const [isArticleOpen, setIsArticleOpen] = useState(false);

    const onArticleOpen = useCallback(() => {
        setIsArticleOpen(true);
    }, []);

    const onArticleClose = useCallback(() => {
        setIsArticleOpen(false);
    }, []);

    return <Page
        className={classNames(cls.ArticleEditPage, {}, [className])}>
        <HStack className={cls.header} justify='between'>
            <span>Создание новой статьи</span>
            {isArticleOpen
                ? <Button className={cls.btn} onClick={onArticleClose}>Закрыть статью</Button>
                : <Button className={cls.btn} onClick={onArticleOpen}>Посмотреть статью</Button>}
        </HStack>
        <DynamicModuleLoader reducers={reducers}>
            <ArticleCreateContent isArticleOpened={isArticleOpen} />
        </DynamicModuleLoader>
    </Page>;
});

export default ArticleEditPage;
