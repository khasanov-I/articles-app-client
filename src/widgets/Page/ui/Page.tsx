import {type ReactNode, memo, useEffect, type UIEvent, useRef, type MutableRefObject} from 'react';
import {useInView} from 'react-intersection-observer';
import {classNames} from '@/shared/lib/classNames';
import cls from './Page.module.scss';
import {type StateSchema, useAppDispatch} from '@/app/providers/StoreProvider';
import {useLocation} from 'react-router-dom';
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect';
import {useSelector} from 'react-redux';
import {useThrottle} from '@/shared/lib/hooks/useThrottle';
import {ScrollRestorationActions, getScrollRestorationByPath} from '@/features/UI';

export type PageProps = {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
};

export const PAGE_ID = 'PAGE_ID';

export const Page = memo(((props: PageProps): ReactNode => {
    const {className = '', children, onScrollEnd} = props;

    const dispatch = useAppDispatch();

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

    const {pathname} = useLocation();

    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollRestorationByPath(state, pathname),
    );

    const {ref, inView} = useInView({
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView) {
            onScrollEnd?.();
        }
    }, [inView, onScrollEnd]);

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(ScrollRestorationActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 500);

    return <main
        id={PAGE_ID}
        className={classNames(cls.Page, {}, [className])}
        ref={wrapperRef}
        onScroll={onScroll}>
        {children}
        <div className={cls.scrollTrigger} ref={ref} />
    </main>;
}));
