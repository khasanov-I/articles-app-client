import {memo, type ReactNode} from 'react';
import {Loader} from 'shared/ui/Loader';
import cls from './PageLoader.module.scss';
import {classNames} from 'shared/lib/classNames';

type PageLoaderProps = {
    className?: string;
};

export const PageLoader = memo((props: PageLoaderProps): ReactNode => {
    const {className = ''} = props;
    return <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>;
});
