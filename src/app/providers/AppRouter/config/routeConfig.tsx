import {AboutPageAsync} from '@/pages/AboutPage';
import {MainPageAsync} from '@/pages/MainPage';
import {NotFoundPage} from '@/pages/NotFoundPage';
import {ProfilePageAsync} from '@/pages/ProfilePage';
import {ArticlesPageAsync} from '@/pages/ArticlesPage';
import {ArticleDetailsPageAsync} from '@/pages/ArticlesDetailsPage';
import {AdminPanelPageAsync} from '@/pages/AdminPanelPage';
import {UserRole} from '@/shared/const/user';
import {ForbiddenPage} from '@/pages/ForbiddenPage';
import {Pages,
    getRouteAbout,
    getRouteAdmin,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteForbidden,
    getRouteArticles,
    getRouteMain,
    getRouteProfile} from '@/shared/const/router';
import {type AppRouterProps} from '@/shared/types/router';
import {ArticleEditPageAsync} from '@/pages/ArticleEditPage';

export const routeConfig: Record<Pages, AppRouterProps> = {
    [Pages.MAIN]: {
        path: getRouteMain(),
        element: <MainPageAsync />,
    },
    [Pages.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPageAsync />,
    },
    [Pages.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePageAsync />,
        authOnly: true,
    },
    [Pages.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPageAsync />,
        authOnly: true,
    },
    [Pages.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPageAsync />,
        authOnly: true,
    },
    [Pages.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPageAsync />,
        authOnly: true,
    },
    [Pages.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPageAsync />,
        authOnly: true,
    },
    [Pages.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPageAsync />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [Pages.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },

    // LAST
    [Pages.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
