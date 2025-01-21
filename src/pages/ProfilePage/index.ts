import {ProfilePageAsync} from './ui/ProfilePage.async';
import {type ProfileArticleListSchema} from './model/types/articles';
import {profileArticlesReducer, profileArticlesActions} from './model/slice/slice';
import {fetchArticlesByProfile} from './model/services/getArticlesByProfileId';
import {getProfileArticles, getProfileArticlesError, getProfileArticlesIsLoading, getProfileMounted} from './model/selectors/selector';

export {ProfilePageAsync, type ProfileArticleListSchema, profileArticlesActions, profileArticlesReducer, fetchArticlesByProfile, getProfileArticles, getProfileArticlesIsLoading, getProfileArticlesError, getProfileMounted};
