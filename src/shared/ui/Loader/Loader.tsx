import {type ReactNode} from 'react';
import {classNames} from '@/shared/lib/classNames';
import './Loader.css';

type LoaderProps = {
    className?: string;
};

export const Loader = (props: LoaderProps): ReactNode => {
    const {className = ''} = props;

    return <div>
        <div className={classNames('lds-ellipsis', {}, [className])}><div></div><div></div><div></div><div></div></div>
    </div>;
};
