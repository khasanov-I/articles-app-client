import {useMemo, type ReactNode, type CSSProperties} from 'react';
import {useTranslation} from 'react-i18next';
import {type Mods, classNames} from 'shared/lib/classNames';
import cls from './Avatar.module.scss';

type AvatarProps = {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
};

export function Avatar(props: AvatarProps): ReactNode {
    const {className = '', src, size, alt} = props;

    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => ({
        width: size ?? 100,
        height: size ?? 100,
    }), [size]);

    const {t} = useTranslation();

    return <img src={src}
        alt={alt}
        style={styles}
        className={classNames(cls.Avatar, mods, [className])} />;
}
