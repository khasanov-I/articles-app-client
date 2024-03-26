import {memo, type ReactNode} from 'react';
import cls from './ArticleCodeBlockComponent.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {type ArticleCodeBlock} from '../../model/types/article';
import {Code} from '@/shared/ui/Code/Code';

type ArticleCodeBlockComponentProps = {
    className?: string;
    block: ArticleCodeBlock;
};

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps): ReactNode => {
    const {className = '', block} = props;

    return <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
        <Code text={block.code} />
    </div>;
});
