import axios from 'axios';
import {USER_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';

const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use(
    config => {
        const token = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
        if (token) {
            config.headers.Authorization = token ?? '';
        }

        return config;
    },
    async error => Promise.reject(error),
);

export default $api;
