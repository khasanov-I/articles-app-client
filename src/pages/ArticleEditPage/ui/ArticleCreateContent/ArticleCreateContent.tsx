import {memo, useCallback, useMemo, useState, type ReactNode} from 'react';
import cls from './ArticleCreateContent.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {type TabItem, Tabs} from '@/shared/ui/Tabs/Tabs';
import {ArticleBlockType, ArticleType} from '@/entities/Article';
import {Input} from '@/shared/ui/Input/Input';
import {FileUpload} from '@/shared/ui/FileUpload/FileUpload';
import {TextArea} from '@/shared/ui/TextArea/TextArea';
import {Button} from '@/shared/ui/Button/Button';
import {type ArticleSchema, type ArticleCreationBlock, type ArticleCreationImageBlock, type ArticleCreationCodeBlock, type ArticleCreationTextBlock} from '../../model/types/articlesCreateSchema';
import {unstable_usePrompt} from 'react-router-dom';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';
import {HStack} from '@/shared/ui/Stack/HStack/HStack';
import {useSelector} from 'react-redux';
import {getUserAuthData} from '@/entities/User';
import {ArticleCreationDetails} from '../ArticleCreationDetails/ArticleCreationDetails';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {createArticle} from '../../model/services/createArticle';
import {NotificationNode} from '@/shared/ui/Notification/Notification';

type ArticleCreateContentProps = {
    className?: string;
    isArticleOpened: boolean;
};

export const ArticleCreateContent = memo((props: ArticleCreateContentProps): ReactNode => {
    const {className = '', isArticleOpened} = props;

    const authData = useSelector(getUserAuthData);

    const [article, setArticle] = useState<ArticleSchema>({
        title: '',
        subtitle: '',
        type: ArticleType.OTHER,
        blocks: [],
    });

    const [blockImages, setBlockImages] = useState<File[]>([]);

    const onChangeArticleTitle = useCallback((value: string) => {
        setArticle(prev => ({
            ...prev,
            title: value,
        }));
    }, []);

    const onChangeArticleImg = useCallback((value: File) => {
        setArticle(prev => ({
            ...prev,
            img: value,
        }));
    }, []);

    const onChangeArticleType = useCallback((tab: TabItem<ArticleType>) => {
        setArticle(prev => ({
            ...prev,
            type: tab.value,
        }));
    }, []);

    const onChangeArticleSubTitle = useCallback((value: string) => {
        setArticle(prev => ({
            ...prev,
            subtitle: value,
        }));
    }, []);

    const [currentImageBlock, setCurrentImageBlock] = useState<ArticleCreationImageBlock>({
        id: '',
        title: '',
        type: ArticleBlockType.IMAGE,
        src: new File([], ''),
    });

    const onChangeImageBlockTitle = useCallback((value: string) => {
        setCurrentImageBlock(prev => ({
            ...prev,
            title: value,
        }));
    }, []);

    const onChangeImageBlockFile = useCallback((value: File) => {
        setCurrentImageBlock(prev => ({
            ...prev,
            src: value,
        }));
    }, []);

    const [currentCodeBlock, setCurrentCodeBlock] = useState<ArticleCreationCodeBlock>({
        id: '',
        code: '',
        type: ArticleBlockType.CODE,
    });

    const onChangeCodeBlockContent = useCallback((value: string) => {
        setCurrentCodeBlock(prev => ({
            ...prev,
            code: value,
        }));
    }, []);

    const [currentTextBlock, setCurrentTextBlock] = useState<ArticleCreationTextBlock>({
        id: '',
        title: '',
        type: ArticleBlockType.TEXT,
        paragraphs: '',
    });

    const onChangeTextBlockTitle = useCallback((value: string) => {
        setCurrentTextBlock(prev => ({
            ...prev,
            title: value,
        }));
    }, []);

    const onChangeTextBlockParagraphs = useCallback((value: string) => {
        setCurrentTextBlock(prev => ({
            ...prev,
            paragraphs: value,
        }));
    }, []);

    const [currentBlockType, setCurrentBlockType] = useState<ArticleBlockType>(ArticleBlockType.TEXT);

    const onChangeBlockType = useCallback((tab: TabItem<ArticleBlockType>) => {
        setCurrentBlockType(tab.value);
    }, []);

    const [isIndicatorOn, setIsIndicatorOn] = useState(false);

    const onChangeBlocks = useCallback(() => {
        setIsIndicatorOn(true);
        setTimeout(() => {
            setIsIndicatorOn(false);
        }, 3000);
        if (currentBlockType === ArticleBlockType.CODE) {
            setArticle(prev => ({...prev, blocks: [...prev.blocks, {
                id: String(Date.now()),
                code: currentCodeBlock.code,
                type: ArticleBlockType.CODE,
            }]}));
        } else if (currentBlockType === ArticleBlockType.IMAGE) {
            setArticle(prev => ({...prev, blocks: [...prev.blocks, {
                id: String(Date.now()),
                type: ArticleBlockType.IMAGE,
                title: currentImageBlock.title,
                src: currentImageBlock.src,
            }]}));
            setBlockImages(prev => [...prev, currentImageBlock.src]);
        } else if (currentBlockType === ArticleBlockType.TEXT) {
            setArticle(prev => ({...prev, blocks: [...prev.blocks, {
                id: String(Date.now()),
                type: ArticleBlockType.TEXT,
                paragraphs: currentTextBlock.paragraphs,
                title: currentTextBlock.title,
            }]}));
        }
    }, [currentBlockType, currentCodeBlock.code, currentImageBlock.src, currentImageBlock.title, currentTextBlock.paragraphs, currentTextBlock.title]);

    const onDeleteBlock = useCallback((block: ArticleCreationBlock) => () => {
        setArticle(prev => ({...prev, blocks: [...prev.blocks.filter(prevBlock => block.id !== prevBlock.id)]}));
    }, []);

    const typeTabs = useMemo(() =>
        [
            {
                value: ArticleType.IT,
                content: 'Айти',
            },
            {
                value: ArticleType.ECONOMICS,
                content: 'Экономика',
            },
            {
                value: ArticleType.SCIENCE,
                content: 'Наука',
            },
            {
                value: ArticleType.OTHER,
                content: 'Другое',
            },
        ], []);

    const blockTypeTabs = useMemo(() =>
        [
            {
                value: ArticleBlockType.CODE,
                content: 'Код',
            },
            {
                value: ArticleBlockType.IMAGE,
                content: 'Картинка',
            },
            {
                value: ArticleBlockType.TEXT,
                content: 'Текст',
            },
        ], []);

    const renderCurrentBlock = useCallback(() => {
        switch (currentBlockType) {
            case ArticleBlockType.CODE:
                return <TextArea value={currentCodeBlock.code} onChange={onChangeCodeBlockContent} />;
            case ArticleBlockType.IMAGE:
                return <>
                    Заголовок изображения:
                    <Input className={cls.input} value={currentImageBlock.title} onChange={onChangeImageBlockTitle} />
                    <FileUpload avatar={currentImageBlock.src} accept='image/*' setFile={onChangeImageBlockFile}>
                    Загрузить изображение
                    </FileUpload>
                </>;
            case ArticleBlockType.TEXT:
                return <>
                    Заголовок блока:
                    <Input className={cls.input} value={currentTextBlock.title} onChange={onChangeTextBlockTitle} />
                    <TextArea value={currentTextBlock.paragraphs} onChange={onChangeTextBlockParagraphs} />
                </>;
            default:
                return null;
        }
    }, [currentBlockType, currentCodeBlock.code, onChangeCodeBlockContent, currentImageBlock.title, currentImageBlock.src, onChangeImageBlockTitle, onChangeImageBlockFile, currentTextBlock.title, currentTextBlock.paragraphs, onChangeTextBlockTitle, onChangeTextBlockParagraphs]);

    const isDataEdited = Boolean(article.title) || Boolean(article.subtitle) || article.blocks.length !== 0 || Boolean(article.img);

    const isBlockCreationButtonDisabled = () => {
        switch (currentBlockType) {
            case ArticleBlockType.CODE:
                return !currentCodeBlock.code;
            case ArticleBlockType.IMAGE:
                return !currentImageBlock.src.name;
            case ArticleBlockType.TEXT:
                return !(currentTextBlock.paragraphs ?? currentTextBlock.title);
            default:
                return false;
        }
    };

    const isArticleCreationButtonDisabled = !article.subtitle || !article.title || article.blocks.length === 0 || !article.img;

    const appDispatch = useAppDispatch();

    const onSendArticle = useCallback(async () => {
        await appDispatch(createArticle({
            images: blockImages,
            ...article,
            userId: Number(authData?.id),
            authorUsername: authData?.username ?? '',
            authorAvatar: authData?.avatar ?? '',
        }));
    }, [appDispatch, article, authData?.avatar, authData?.id, authData?.username, blockImages]);

    unstable_usePrompt({
        message: 'Несохраненные данные будут удалены. Вы уверены?',
        when: ({currentLocation, nextLocation}) =>
            (isDataEdited && currentLocation.pathname !== nextLocation.pathname),
    });

    return <div className={classNames(cls.ArticleCreateContent, {}, [className])}>
        <ArticleCreationDetails className={isArticleOpened ? '' : cls.none} onDeleteBlock={onDeleteBlock} article={article} />
        <VStack className={isArticleOpened ? cls.none : ''} gap='8'>
            <HStack className={cls.options} max align='start' gap='16'>
                <VStack className={cls.tabsContainer} gap='8'>
                    <Tabs className={cls.tabs} onTabClick={onChangeArticleType} tabs={typeTabs} value={article.type} />
                    <FileUpload avatar={article.img} accept='image/*' setFile={onChangeArticleImg}>
                        Загрузить изображение
                    </FileUpload>
                </VStack>
                <VStack gap='8' className={cls.headers}>
                    <span>Напишите заголовок:</span>
                    <Input className={cls.input} value={article.title} onChange={onChangeArticleTitle} />
                    <span>Напишите подзаголовок:</span>
                    <Input className={cls.input} value={article.subtitle} onChange={onChangeArticleSubTitle} />
                </VStack>
            </HStack>
            <Tabs className={cls.blockTabs} onTabClick={onChangeBlockType} tabs={blockTypeTabs} value={currentBlockType} />
            {renderCurrentBlock()}
            <Button disabled={isBlockCreationButtonDisabled()} className={cls.button} onClick={onChangeBlocks}>
                Добавить блок
            </Button>
            <Button disabled={isArticleCreationButtonDisabled} className={cls.button} onClick={onSendArticle} >
                Создать статью
            </Button>
        </VStack>
        {isIndicatorOn && <NotificationNode>
            Блок добавлен
        </NotificationNode>}
    </div>;
});
