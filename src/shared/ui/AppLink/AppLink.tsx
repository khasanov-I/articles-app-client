import {type ReactNode} from 'react';
import {Link, type LinkProps} from 'react-router-dom';
import {classNames} from 'shared/lib/classNames';
import cls from './AppLink.module.scss';

export enum LinkTheme {
    CLEAR = 'clear',
    SIDEBAR_LINK = 'sidebar-link',
}

type AppLinkProps = {
    className?: string;
    theme?: LinkTheme;
} & LinkProps;

export function AppLink(props: AppLinkProps): ReactNode {
    const {theme = LinkTheme.CLEAR, className = '', children, ...otherProps} = props;

    return (
        <Link
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
}
