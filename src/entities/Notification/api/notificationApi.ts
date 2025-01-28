import {rtkApi} from '@/shared/api/rtkApi';
import {type Notification} from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: build => ({
        getNotifications: build.query<Notification[], string>({
            query: (id: string) => ({
                url: `/notifications/${id}`,
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
