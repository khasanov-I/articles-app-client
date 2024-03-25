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

