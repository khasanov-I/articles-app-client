import {type RouteProps} from 'react-router-dom';
import {AboutPageAsync} from 'pages/AboutPage';
import {MainPageAsync} from 'pages/MainPage';
import {NotFoundPage} from 'pages/NotFoundPage';
import {ProfilePageAsync} from 'pages/ProfilePage';

enum Pages {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    NOT_FOUND = 'not-found',
}

type AppRouterProps = RouteProps & {
    authOnly?: boolean;
};

export const pagePaths: Record<Pages, string> = {
    [Pages.MAIN]: '/',
    [Pages.ABOUT]: '/about',
    [Pages.PROFILE]: '/profile',
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
    [Pages.NOT_FOUND]: {
        path: pagePaths['not-found'],
        element: <NotFoundPage />,
    },
};
