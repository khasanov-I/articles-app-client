import {profileReducer} from 'entities/Profile';
import {type ReactNode} from 'react';
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

    const {t} = useTranslation();

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames('', {}, [className])}>{t('')}</div>
    </DynamicModuleLoader>;
}

export default ProfilePage;
