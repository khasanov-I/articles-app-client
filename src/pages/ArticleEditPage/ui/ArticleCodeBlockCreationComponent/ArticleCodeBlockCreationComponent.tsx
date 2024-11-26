import {memo, type ReactNode} from 'react';
import cls from './ArticleCodeBlockCreationComponent.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {Code} from '@/shared/ui/Code/Code';
import {type ArticleCreationCodeBlock} from '../../model/types/articlesCreateSchema';
import {Button, ButtonTheme} from '@/shared/ui/Button/Button';

type ArticleCodeBlockCreationComponentProps = {
    className?: string;
    block: ArticleCreationCodeBlock;
    onDelete?: () => void;
};

export const ArticleCodeBlockCreationComponent = memo((props: ArticleCodeBlockCreationComponentProps): ReactNode => {
    const {className = '', onDelete, block} = props;

    return <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
        <Button className={cls.closeButton} theme={ButtonTheme.IMAGE_BUTTON} onClick={onDelete}>X</Button>
        <Code text={block.code} />
    </div>;
});
