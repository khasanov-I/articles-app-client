
import axios from 'axios';
import {TOKEN_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';

const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
});

$api?.interceptors?.request?.use(
    config => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
        if (token) {
            config.headers.Authorization = 'Bearer ' + encodeURI(token);
        }

        return config;
    },
    async error => Promise.reject(error),
);

$api?.interceptors?.response?.use(config => config, async error => {
    const originalRequest = error?.config;
    if (error?.response?.status === 401 && error?.config && !error?.config?._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${__API__}/auth/refresh`, {withCredentials: true});
            localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, response.data.accessToken);
            return await $api.request(originalRequest);
        } catch (e) {
            // Location.reload();
        }
    }

    throw error;
});

export default $api;
