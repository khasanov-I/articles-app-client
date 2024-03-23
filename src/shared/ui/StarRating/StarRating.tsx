import {memo, useState, type ReactNode} from 'react';
import cls from './StarRating.module.scss';
import {classNames, type Mods} from '@/shared/lib/classNames';
import {BlackStarLogo} from '@/shared/assets/icons';

type StarRatingProps = {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
};

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps): ReactNode => {
    const {className = '', onSelect, size = 30, selectedStars = 0} = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const getMods = (starNumber: number): Mods => {
        const isCurrentStarBigger = currentStarsCount >= starNumber;
        return {
            [cls.hovered]: isCurrentStarBigger,
            [cls.normal]: !isCurrentStarBigger,
            [cls.selected]: isSelected,
        };
    };

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return <div className={classNames('', {}, [className])}>
        {stars.map(starNumber =>
            <BlackStarLogo
                key={starNumber}
                className={classNames(cls.starIcon, getMods(starNumber), [])}
                width={size}
                height={size}
                onMouseLeave={onLeave}
                onMouseEnter={onHover(starNumber)}
                onClick={onClick(starNumber)}/>)}
    </div>;
});
