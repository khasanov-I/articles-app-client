import {type RouteProps} from 'react-router-dom';
import {AboutPageAsync} from 'pages/AboutPage';
import {MainPageAsync} from 'pages/MainPage';
import {NotFoundPage} from 'pages/NotFoundPage';
import {ProfilePageAsync} from 'pages/ProfilePage';
import {ArticlesPageAsync} from 'pages/ArticlesPage';
import {ArticleDetailsPageAsync} from 'pages/ArticlesDetailsPage';

export enum Pages {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    NOT_FOUND = 'not-found',
}

export type AppRouterProps = RouteProps & {
    authOnly?: boolean;
};

export const pagePaths: Record<Pages, string> = {
    [Pages.MAIN]: '/',
    [Pages.ABOUT]: '/about',
    [Pages.PROFILE]: '/profile',
    [Pages.ARTICLES]: '/articles',
    [Pages.ARTICLE_DETAILS]: '/articles/',
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
        path: pagePaths.profile,
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
    [Pages.NOT_FOUND]: {
        path: pagePaths['not-found'],
        element: <NotFoundPage />,
    },
};
