import {createAsyncThunk} from '@reduxjs/toolkit';
import {type ThunkConfig} from '@/app/providers/StoreProvider';
import {isAxiosError} from 'axios';
import {type ArticleSchema} from '../types/articlesCreateSchema';
import {createFormdataFromObject} from '@/shared/lib/createFormdataFromObject/createFormdataFromObject';

type CreateArticleProps = {
    images: File[];
    userId: number;
    authorAvatar: string;
    authorUsername: string;
} & ArticleSchema;

export const createArticle = createAsyncThunk<void, CreateArticleProps, ThunkConfig<string>>(
    'createArticle',
    async (article, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI;

        try {
            const {images, ...other} = article;

            const formdata = createFormdataFromObject(other);

            images.forEach(e => {
                formdata.append('files[]', e);
            });

            const resp = await extra.api.post<number>('/articles', formdata);

            if (!resp.data) {
                throw new Error('Произошла ошибка на сервере');
            }

            window.location.href = `/profile/${resp.data}`;
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return rejectWithValue(e.response?.data);
            }

            return rejectWithValue('error');
        }
    },
);
