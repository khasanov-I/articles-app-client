import {useAppDispatch} from 'app/providers/StoreProvider';
import {ProfileCard, fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadOnly, profileActions, profileReducer} from 'entities/Profile';
import {useEffect, type ReactNode, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames';
import {DynamicModuleLoader, type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {ProfilePageHeader} from './ProfilePageHeader/ProfilePageHeader';
import {Currency} from 'entities/Currency';
import {Country} from 'entities/Country';

type ProfilePageProps = {
    className?: string;
};

const reducers: ReducersList = {
    profile: profileReducer,
};

function ProfilePage(props: ProfilePageProps): ReactNode {
    const {className = ''} = props;

    const dispatch = useAppDispatch();

    const formData = useSelector(getProfileForm);

    const error = useSelector(getProfileError);

    const isLoading = useSelector(getProfileIsLoading);

    const readOnly = useSelector(getProfileReadOnly);

    useEffect(() => {
        void dispatch(fetchProfileData());
    }, [dispatch]);

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({firstname: value || ''}));
    }, [dispatch]);

    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}));
    }, [dispatch]);

    const onChangeAge = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({age: Number(value || 0)}));
    }, [dispatch]);

    const onChangeCity = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({city: value || ''}));
    }, [dispatch]);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({username: value || ''}));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({avatar: value || ''}));
    }, [dispatch]);

    const onChangeCurrency = useCallback((value: Currency) => {
        dispatch(profileActions.updateProfile({currency: value || Currency.USD}));
    }, [dispatch]);

    const onChangeCountry = useCallback((value: Country) => {
        dispatch(profileActions.updateProfile({country: value || Country.Kazahstan}));
    }, [dispatch]);

    return <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <ProfilePageHeader />
        <div className={classNames('', {}, [className])}>
            <ProfileCard
                data={formData}
                error={error}
                isLoading={isLoading}
                onChangeFirstname={onChangeFirstname}
                onChangeLastname={onChangeLastname}
                onChangeAge={onChangeAge}
                onChangeCity={onChangeCity}
                onChangeAvatar={onChangeAvatar}
                onChangeUsername={onChangeUsername}
                onChangeCurrency={onChangeCurrency}
                onChangeCountry={onChangeCountry}
                readOnly={readOnly}/>
        </div>
    </DynamicModuleLoader>;
}

export default ProfilePage;
