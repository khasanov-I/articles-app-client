import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import cls from './AppLink.module.scss';

enum LinkTheme {
  CLEAR = 'clear',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: LinkTheme;
}

export function AppLink(props: AppLinkProps): ReactNode {
  const { theme = LinkTheme.CLEAR, className, children, ...otherProps } = props;

  return (
    <Link
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
}
