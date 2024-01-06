import {AboutLogo, ArticleLogo, HomeLogo, UserLogo} from 'shared/assets/icons';
import {pagePaths} from 'shared/lib/routeConfig';

export type SidebarItemType = {
    path: string;
    text: string;
    icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    authOnly?: boolean;
};

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: pagePaths.main,
        icon: HomeLogo,
        text: 'Главная',
    },
    {
        path: pagePaths.about,
        icon: AboutLogo,
        text: 'О сайте',
    },
    {
        path: pagePaths.profile,
        icon: UserLogo,
        text: 'Моя страница',
        authOnly: true,
    },
    {
        path: pagePaths.articles,
        icon: ArticleLogo,
        text: 'Статьи',
        authOnly: true,
    },
];
