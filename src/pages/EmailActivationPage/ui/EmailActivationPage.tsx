import {useAppDispatch} from '@/app/providers/StoreProvider';
import {Page} from '@/widgets/Page';
import {useEffect, useState, type ReactNode} from 'react';
import {useParams} from 'react-router-dom';
import {activate} from '../model/activate';

type EmailActivationPageProps = {
    className?: string;
};

export const EmailActivationPage = (props: EmailActivationPageProps): ReactNode => {
    const {className = ''} = props;

    const appDispatch = useAppDispatch();

    const [error, setError] = useState('');

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        void appDispatch(activate({activationLink: id}));
    }, [appDispatch, id]);

    if (!id) {
        return null;
    }

    return <Page>
        {error ? <div>Ошибка</div> : <div>Ваш аккаунт активирован!</div>}
    </Page>;
};
