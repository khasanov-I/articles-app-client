import {AboutPageAsync} from '@/pages/AboutPage';
import {MainPageAsync} from '@/pages/MainPage';
import {NotFoundPage} from '@/pages/NotFoundPage';
import {ProfilePageAsync} from '@/pages/ProfilePage';
import {ArticlesPageAsync} from '@/pages/ArticlesPage';
import {ArticleDetailsPageAsync} from '@/pages/ArticlesDetailsPage';
import {AdminPanelPageAsync} from '@/pages/AdminPanelPage';
import {UserRole} from '@/shared/const/user';
import {ForbiddenPage} from '@/pages/ForbiddenPage';
import {Pages} from '@/shared/const/router';
import {pagePaths} from '@/shared/const/router';
import {type AppRouterProps} from '@/shared/types/router';
import {ArticleEditPageAsync} from '@/pages/ArticleEditPage';

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
