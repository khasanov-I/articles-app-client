import {memo} from 'react';
import {classNames} from '@/shared/lib/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

type HeaderTag = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTag> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};

type TextProps = {
    title?: string;
    className?: string;
    theme?: TextTheme;
    text?: string;
    align?: TextAlign;
    size?: TextSize;
    'data-testid'?: string;
};

export const Text = memo((props: TextProps) => {
    const {className = '', theme = TextTheme.PRIMARY, title, text,
        size = TextSize.M, align = TextAlign.CENTER,
        'data-testid': dataTestId} = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    return <div className={classNames(cls.Text, {}, [className,
        cls[theme],
        cls[size],
        cls[align]])}>
        {title ? <HeaderTag
            className={cls.title}
            data-testid={`${dataTestId}.Header`}>
            {title}
        </HeaderTag> : undefined}
        {text ? <p
            className={cls.text}
            data-testid={`${dataTestId}.Paragraph`}>
            {text}
        </p> : undefined}
    </div>;
});
