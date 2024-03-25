import {memo, type ReactNode, type HTMLAttributeAnchorTarget} from 'react';
import cls from './ArticleListItem.module.scss';
import {type Article, type ArticleTextBlock} from '../../model/types/article';
import {ArticleView} from '../../model/consts/consts';
import {ArticleBlockType} from '../../model/consts/consts';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {Text} from '@/shared/ui/Text/Text';
import {EyeLogo} from '@/shared/assets/icons';
import {Card} from '@/shared/ui/Card/Card';
import {Avatar} from '@/shared/ui/Avatar/Avatar';
import {Button} from '@/shared/ui/Button/Button';
import {ArticleTextBlockComponent} from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {AppLink} from '@/shared/ui/AppLink/AppLink';
import {pagePaths} from '@/shared/const/router';

type ArticleListItemProps = {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
};

export const ArticleListItem = memo((props: ArticleListItemProps): ReactNode => {
    const {className = '', article, view, target} = props;

    const {t} = useTranslation();

    if (view === ArticleView.BIG) {
        const textBlocks = article.blocks.find(block =>
            block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

        return <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.header}>
                    <Avatar size={30} src={article.user.avatar}/>
                    <Text text={article.user.username} className={cls.username}/>
                    <Text text={article.createdAt} className={cls.date}/>
                </div>
                <Text title={article.title} className={cls.title} />
                <Text text={article.type.join(', ')} className={cls.types}/>
                <img src={article.img} className={cls.img}/>
                {textBlocks && <ArticleTextBlockComponent block={textBlocks} className={cls.textBlock}/>}
                <div className={cls.footer}>
                    <AppLink
                        target={target}
                        to={pagePaths.article_details + article.id}>
                        <Button>
                            {t('Читать далее')}
                        </Button>
                    </AppLink>
                    <Text text={String(article.views)} className={cls.views}/>
                    <EyeLogo className='icons' />
                </div>
            </Card>
        </div>;
    }

    return <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <AppLink
            target={target}
            to={pagePaths.article_details + article.id}>
            <Card>
                <div className={cls.imageWrapper}>
                    <img src={article.img} className={cls.img}/>
                    <Text text={article.createdAt} className={cls.date}/>
                </div>
                <div className={cls.infoWrapper}>
                    <Text text={article.type.join(', ')} className={cls.types}/>
                    <Text text={String(article.views)} className={cls.views}/>
                    <EyeLogo className='icons' />
                </div>
                <Text text={article.title} className={cls.title}/>
            </Card>
        </AppLink>
    </div>;
});

