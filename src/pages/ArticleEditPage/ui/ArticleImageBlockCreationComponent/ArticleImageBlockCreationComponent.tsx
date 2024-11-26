import cls from './ArticleImageBlockCreationComponent.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {memo, type ReactNode} from 'react';
import {Text} from '@/shared/ui/Text/Text';
import {type ArticleCreationImageBlock} from '../../model/types/articlesCreateSchema';
import {Button, ButtonTheme} from '@/shared/ui/Button/Button';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';

type ArticleImageBlockCreationComponentProps = {
    className?: string;
    block: ArticleCreationImageBlock;
    onDelete?: () => void;
};

export const ArticleImageBlockCreationComponent = memo((props: ArticleImageBlockCreationComponentProps): ReactNode => {
    const {className = '', block, onDelete} = props;

    return <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
        <VStack>
            <Button className={cls.closeButton} theme={ButtonTheme.IMAGE_BUTTON} onClick={onDelete}>X</Button>
            <img src={URL.createObjectURL(block.src as Blob)} className={cls.img}/>
        </VStack>
        {block.title && (
            <Text text={block.title}/>
        )}
    </div>;
});
