import cls from './ArticleImageBlockComponent.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {memo, type ReactNode} from 'react';
import {type ArticleImageBlock} from '../../model/types/article';
import {Text} from '@/shared/ui/Text/Text';

type ArticleImageBlockComponentProps = {
    className?: string;
    block: ArticleImageBlock;
};

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps): ReactNode => {
    const {className = '', block} = props;

    return <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
        <img src={`${__API__}/${block.src}`} className={cls.img}/>
        {block.title && (
            <Text text={block.title}/>
        )}
    </div>;
});
