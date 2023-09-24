import {type RouteProps} from 'react-router-dom';
import {AboutPageAsync} from 'pages/AboutPage';
import {MainPageAsync} from 'pages/MainPage';

enum Pages {
    MAIN = 'main',
    ABOUT = 'about',
}

export const pagePaths: Record<Pages, string> = {
    [Pages.MAIN]: '/',
    [Pages.ABOUT]: '/about',
};

export const routeConfig: Record<Pages, RouteProps> = {
    [Pages.MAIN]: {
        path: pagePaths.main,
        element: <MainPageAsync />,
    },
    [Pages.ABOUT]: {
        path: pagePaths.about,
        element: <AboutPageAsync />,
    },
};
