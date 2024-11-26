import cls from './ArticleTextBlockCreationComponent.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {memo, type ReactNode} from 'react';
import {Text, TextAlign} from '@/shared/ui/Text/Text';
import {type ArticleCreationTextBlock} from '../../model/types/articlesCreateSchema';
import {Button, ButtonTheme} from '@/shared/ui/Button/Button';

type ArticleTextBlockCreationComponentProps = {
    className?: string;
    block: ArticleCreationTextBlock;
    onDelete?: () => void;
};

export const ArticleTextBlockCreationComponent = memo((props: ArticleTextBlockCreationComponentProps): ReactNode => {
    const {className = '', onDelete, block} = props;

    return <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
        <Button className={cls.closeButton} theme={ButtonTheme.IMAGE_BUTTON} onClick={onDelete}>X</Button>
        {block.title && (
            <Text title={block.title} className={cls.title}/>
        )}
        <Text align={TextAlign.LEFT} text={block.paragraphs} className={cls.paragraph}/>
    </div>;
});
