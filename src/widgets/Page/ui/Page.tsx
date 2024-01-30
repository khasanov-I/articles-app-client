import {type ReactNode, memo, useEffect, type UIEvent, useRef, type MutableRefObject} from 'react';
import {useInView} from 'react-intersection-observer';
import {classNames} from 'shared/lib/classNames';
import cls from './Page.module.scss';
import {type StateSchema, useAppDispatch} from 'app/providers/StoreProvider';
import {ScrollRestorationActions} from '../model/slice/ScrollRestorationSlice';
import {useLocation} from 'react-router-dom';
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect';
import {useSelector} from 'react-redux';
import {getScrollRestorationByPath} from '../model/selectors/ScrollRestoration';
import {useThrottle} from 'shared/lib/hooks/useThrottle';

export type PageProps = {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
};

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

    return <section className={classNames(cls.Page, {}, [className])}
        ref={wrapperRef}
        onScroll={onScroll}>
        {children}
        <div ref={ref} />
    </section>;
}));
