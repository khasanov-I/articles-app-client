import {type BaseQueryFn, createApi, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {TOKEN_LOCAL_STORAGE_KEY} from '@/shared/const/localStorage';
import {Mutex} from 'async-mutex';
import {logout} from '@/features/Register';

const baseQuery = fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders(headers) {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
        if (token) {
            headers.set('Authorization', 'Bearer ' + encodeURI(token));
        }

        return headers;
    },
    credentials: 'include',
});

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
    // Checking whether the mutex is locked
        // eslint-disable-next-line no-negated-condition
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    '/auth/refresh',
                    api,
                    extraOptions,
                );
                if (refreshResult.data) {
                    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, refreshResult.data.accessToken);
                    // Retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
            } finally {
                // Release must be called once the mutex should be released again.
                release();
            }
        } else {
            // Wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
});
