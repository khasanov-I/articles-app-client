import cls from './ArticleTextBlockComponent.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {memo, type ReactNode} from 'react';
import {type ArticleTextBlock} from '@/entities/Article/model/types/article';
import {Text} from '@/shared/ui/Text/Text';

type ArticleTextBlockComponentProps = {
    className?: string;
    block: ArticleTextBlock;
};

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps): ReactNode => {
    const {className = '', block} = props;

    return <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
        {block.title && (
            <Text title={block.title} className={cls.title}/>
        )}
        {block.paragraphs.map((paragraph, index) => (
            <Text key={paragraph} text={paragraph} className={cls.paragraph}/>
        ))}
    </div>;
});
