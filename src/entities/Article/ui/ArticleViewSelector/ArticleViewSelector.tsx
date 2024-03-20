import {memo, type ReactNode} from 'react';
import cls from './ArticleViewSelector.module.scss';
import {classNames} from '@/shared/lib/classNames';
import { ArticleView } from '@/entities/Article/model/consts/consts';
import {GridLogo, MenuLogo} from '@/shared/assets/icons';
import {Button, ButtonTheme} from '@/shared/ui/Button/Button';

type ArticleViewSelectorProps = {
    className?: string;
    view?: ArticleView;
    onViewClick?: (view: ArticleView) => void;
};

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: GridLogo,
    },
    {
        view: ArticleView.BIG,
        icon: MenuLogo,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps): ReactNode => {
    const {className = '', view, onViewClick} = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
        {viewTypes.map((viewType, index) =>
            <Button className={cls.button} key={index} theme={ButtonTheme.IMAGE_BUTTON}
                onClick={onClick(viewType.view)}>
                <viewType.icon
                    className={classNames('icons', {[cls.notSelected]: viewType.view !== view}, [])}/>
            </Button>)}
    </div>;
});
