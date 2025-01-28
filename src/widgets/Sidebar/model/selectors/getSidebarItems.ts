import {createSelector} from '@reduxjs/toolkit';
import {getUserAuthData} from '@/entities/User';
import {type SidebarItemType} from '../types/sidebar';
import {AboutLogo, ArticleLogo, UserLogo} from '@/shared/assets/icons';
import {pagePaths} from '@/shared/const/router';

export const getSidebarItems = createSelector(getUserAuthData, authData => {
    const sidebarItemsList: SidebarItemType[] = [
        // {
        //     path: pagePaths.main,
        //     icon: HomeLogo,
        //     text: 'Главная',
        // },
        {
            path: pagePaths.profile + authData?.id,
            icon: UserLogo,
            text: 'Моя страница',
            authOnly: true,
        },
        {
            path: pagePaths.articles,
            icon: ArticleLogo,
            text: 'Статьи',
            // AuthOnly: true,
        },
        {
            path: pagePaths.about,
            icon: AboutLogo,
            text: 'О сайте',
        },
    ];

    return sidebarItemsList;
});
