import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {isAxiosError} from 'axios';
import {register} from './register';
import {registerActions} from '../slice/registerSlice';

type SendMailProps = {
    email: string;
    username: string;
    avatar?: File;
    password: string;
};

export type MailResponseType = {
    isActivated: boolean;
    activationLink: string;
};

export const sendMail = createAsyncThunk<MailResponseType, SendMailProps, ThunkConfig<Record<string, any> | string>>(
    'sendMail',
    async (sendMailProps, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI;

        try {
            const mailResponse = await extra.api.post<MailResponseType>('/mail', {
                username: sendMailProps.username,
                email: sendMailProps.email,
                password: sendMailProps.password,
            });

            if (!mailResponse.data) {
                throw new Error('Письмо не отправлено');
            }

            const eventSource = new EventSource('http://localhost:5000/auth/register/listen');

            eventSource.onmessage = async function (event) {
                if (event.data === mailResponse.data) {
                    await dispatch(register({...sendMailProps}));
                    dispatch(registerActions.setExpectingForVerification(false));
                    eventSource.close();
                }
            };

            return mailResponse.data;
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return rejectWithValue(e.response?.data);
            }

            return rejectWithValue({
                unknownError: 'Неизвестная ошибка',
            });
        }
    },
);
