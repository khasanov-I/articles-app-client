import cls from './ArticleCreationDetails.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {type ReactNode, memo, useCallback} from 'react';
import {Text} from '@/shared/ui/Text/Text';
import {CalendarLogo, EyeLogo} from '@/shared/assets/icons';
import {type ArticleCreationBlock, type ArticleSchema} from '../../model/types/articlesCreateSchema';
import {ArticleBlockType} from '@/entities/Article';
import {ArticleCodeBlockCreationComponent} from '../ArticleCodeBlockCreationComponent/ArticleCodeBlockCreationComponent';
import {ArticleImageBlockCreationComponent} from '../ArticleImageBlockCreationComponent/ArticleImageBlockCreationComponent';
import {ArticleTextBlockCreationComponent} from '../ArticleTextBlockCreationComponent/ArticleTextBlockCreationComponent';

type ArticleCreationDetailsProps = {
    className?: string;
    article: ArticleSchema;
    onDeleteBlock: (block: ArticleCreationBlock) => () => void;
};

export const ArticleCreationDetails = memo((props: ArticleCreationDetailsProps): ReactNode => {
    const {className = '', article, onDeleteBlock} = props;

    const renderBlocks = useCallback((block: ArticleCreationBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockCreationComponent onDelete={onDeleteBlock(block)} key={block.id} className={cls.block} block={block}/>;
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockCreationComponent onDelete={onDeleteBlock(block)} key={block.id} className={cls.block} block={block}/>;
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockCreationComponent onDelete={onDeleteBlock(block)} key={block.id} className={cls.block} block={block}/>;
            default:
                return null;
        }
    }, [onDeleteBlock]);

    const content = (
        <>
            {article.img ? <div className={cls.avatarWrapper}>
                <img src={URL.createObjectURL(article?.img as Blob)}
                    // Size={200}
                    className={cls.avatar}
                />
            </div> : null}
            <Text title={article?.title} text={article?.subtitle}/>
            <div className={cls.articleInfo}>
                <EyeLogo className='icons' />
                <Text text={String(0)}/>
            </div>
            <div className={cls.articleInfo}>
                <CalendarLogo className='icons' />
                <Text text={new Date().toDateString()}/>
            </div>
            {article?.blocks.map(renderBlocks)}
        </>
    );

    return <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
    </div>;
});
