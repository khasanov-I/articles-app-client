import { ReactNode } from 'react';
import cls from './Navbar.module.scss';
import { pagePaths } from 'shared/lib/routeConfig';
import { AppLink } from 'shared/ui/AppLink';

export function Navbar(): ReactNode {
  return (
    <div className={cls.navbar}>
      <div className={cls.links}>
        <AppLink to={pagePaths.main}>Home</AppLink>
        <AppLink to={pagePaths.about}>About</AppLink>
      </div>
    </div>
  );
}
