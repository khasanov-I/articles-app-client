import {type RouteProps} from 'react-router-dom';
import {AboutPageAsync} from 'pages/AboutPage';
import {MainPageAsync} from 'pages/MainPage';
import {NotFoundPage} from 'pages/NotFoundPage';
import {ProfilePageAsync} from 'pages/ProfilePage';
import {ArticlesPageAsync} from 'pages/ArticlesPage';
import {ArticleDetailsPageAsync} from 'pages/ArticlesDetailsPage';
import {ArticleEditPageAsync} from 'pages/ArticleEditPage/ui/ArticleEditPage/ArticleEditPage.async';
import {AdminPanelPageAsync} from 'pages/AdminPanelPage';
import {UserRole} from 'entities/User/model/consts/consts';
import {ForbiddenPage} from 'pages/ForbiddenPage';

export enum Pages {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',

    // LAST
    NOT_FOUND = 'not-found',
}

export type AppRouterProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};

export const pagePaths: Record<Pages, string> = {
    [Pages.MAIN]: '/',
    [Pages.ABOUT]: '/about',
    [Pages.PROFILE]: '/profile/',
    [Pages.ARTICLES]: '/articles',
    [Pages.ARTICLE_DETAILS]: '/articles/',
    [Pages.ARTICLE_CREATE]: '/articles/new',
    [Pages.ARTICLE_EDIT]: '/articles/:id/edit',
    [Pages.ADMIN_PANEL]: '/admin',
    [Pages.FORBIDDEN]: '/forbidden',

    // LAST
    [Pages.NOT_FOUND]: '*',
};

export const routeConfig: Record<Pages, AppRouterProps> = {
    [Pages.MAIN]: {
        path: pagePaths.main,
        element: <MainPageAsync />,
    },
    [Pages.ABOUT]: {
        path: pagePaths.about,
        element: <AboutPageAsync />,
    },
    [Pages.PROFILE]: {
        path: `${pagePaths.profile}:id`,
        element: <ProfilePageAsync />,
        authOnly: true,
    },
    [Pages.ARTICLES]: {
        path: pagePaths.articles,
        element: <ArticlesPageAsync />,
        authOnly: true,
    },
    [Pages.ARTICLE_DETAILS]: {
        path: `${pagePaths.article_details}:id`,
        element: <ArticleDetailsPageAsync />,
        authOnly: true,
    },
    [Pages.ARTICLE_CREATE]: {
        path: pagePaths.article_create,
        element: <ArticleEditPageAsync />,
        authOnly: true,
    },
    [Pages.ARTICLE_EDIT]: {
        path: pagePaths.article_edit,
        element: <ArticleEditPageAsync />,
        authOnly: true,
    },
    [Pages.ADMIN_PANEL]: {
        path: pagePaths.admin_panel,
        element: <AdminPanelPageAsync />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [Pages.FORBIDDEN]: {
        path: pagePaths.forbidden,
        element: <ForbiddenPage />,
    },

    // LAST
    [Pages.NOT_FOUND]: {
        path: pagePaths['not-found'],
        element: <NotFoundPage />,
    },
};
