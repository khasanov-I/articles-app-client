export type Notification = {
    id: string;
    title: string;
    description: string;
    href?: string;
};

export type NotificationSchema = {
    error?: string;
    isLoading: boolean;
};
