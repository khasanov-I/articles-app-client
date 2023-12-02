import {useAppDispatch} from 'app/providers/StoreProvider';
import {ProfileCard, fetchProfileData, profileReducer} from 'entities/Profile';
import {useEffect, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import {DynamicModuleLoader, type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';

type ProfilePageProps = {
    className?: string;
};

const reducers: ReducersList = {
    profile: profileReducer,
};

function ProfilePage(props: ProfilePageProps): ReactNode {
    const {className = ''} = props;

    const dispatch = useAppDispatch();

    const {t} = useTranslation();

    useEffect(() => {
        void dispatch(fetchProfileData());
    }, [dispatch]);

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames('', {}, [className])}>
            <ProfileCard />
        </div>
    </DynamicModuleLoader>;
}

export default ProfilePage;
