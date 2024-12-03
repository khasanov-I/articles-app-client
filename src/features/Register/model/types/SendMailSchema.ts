export type SendMailSchema = {
    isLoading: boolean;
    preventNextClick: boolean;
    errors?: SendMailErrorType;
    error?: string;
};

type SendMailErrorType = {
    usernameExists?: string;
    emailExists?: string;
    username?: string;
    password?: string;
    email?: string;
    unknownError?: string;
};
