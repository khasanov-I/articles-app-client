export enum Pages {
    // MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    EMAIL_ACTIVATE = 'email_activate',

    // LAST
    NOT_FOUND = 'not-found',
}

// Export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/';
// Export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteEmailActivate = (id: string) => `/email_activate/${id}`;
export const getRouteForbidden = () => '/forbidden';

export const pagePaths: Record<Pages, string> = {
    // [Pages.MAIN]: '/',
    [Pages.ABOUT]: '/about',
    [Pages.PROFILE]: '/profile/',
    // [Pages.ARTICLES]: '/articles',
    [Pages.ARTICLES]: '/',
    [Pages.ARTICLE_DETAILS]: '/articles/',
    [Pages.ARTICLE_CREATE]: '/articles/new',
    [Pages.ARTICLE_EDIT]: '/articles/:id/edit',
    [Pages.ADMIN_PANEL]: '/admin',
    [Pages.FORBIDDEN]: '/forbidden',
    [Pages.EMAIL_ACTIVATE]: '/email_activate',

    // LAST
    [Pages.NOT_FOUND]: '*',
};

