import {Suspense, lazy} from 'react';
import {type ArticleRatingProps} from './ArticleRating';
import {Loader} from '@/shared/ui/Loader/Loader';

export const ArticleRatingLazy = lazy(async () => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => <Suspense fallback={<Loader />}>
    <ArticleRatingLazy {...props}/>
</Suspense>;
