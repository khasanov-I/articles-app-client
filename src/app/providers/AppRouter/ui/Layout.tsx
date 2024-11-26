import {memo, type ReactNode} from 'react';
import {Navbar} from '@/widgets/Navbar';
import {Sidebar} from '@/widgets/Sidebar';
import {useSelector} from 'react-redux';
import {getUserInited} from '@/entities/User';
import {Outlet} from 'react-router-dom';

type LayoutProps = {
    className?: string;
};

export const Layout = memo((props: LayoutProps): ReactNode => {
    const {className = ''} = props;

    const inited = useSelector(getUserInited);

    return <>
        <Navbar />
        <div className='content-page'>
            <Sidebar />
            {inited && <Outlet />}
        </div>
    </>;
});
