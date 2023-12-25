import {useAppDispatch} from 'app/providers/StoreProvider';
import {ProfileCard, fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadOnly, getProfileValidateErrors, profileActions, profileReducer} from 'entities/Profile';
import {useEffect, type ReactNode, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames';
import {DynamicModuleLoader, type ReducersList} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {ProfilePageHeader} from './ProfilePageHeader/ProfilePageHeader';
import {Currency} from 'entities/Currency';
import {Country} from 'entities/Country';
import {Text, TextTheme} from 'shared/ui/Text/Text';
import {ValidateProfileError} from 'entities/Profile/model/types/profile';
import {useTranslation} from 'react-i18next';

type ProfilePageProps = {
    className?: string;
};

const reducers: ReducersList = {
    profile: profileReducer,
};

function ProfilePage(props: ProfilePageProps): ReactNode {
    const {className = ''} = props;

    const {t} = useTranslation('profile');

    const dispatch = useAppDispatch();

    const formData = useSelector(getProfileForm);

    const error = useSelector(getProfileError);

    const isLoading = useSelector(getProfileIsLoading);

    const readOnly = useSelector(getProfileReadOnly);

    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: 'Серверная ошибка при сохранении',
        [ValidateProfileError.INCORRECT_COUNTRY]: 'Некорректный регион',
        [ValidateProfileError.NO_DATA]: 'Данные не указаны',
        [ValidateProfileError.INCORRECT_USER_DATA]: 'Имя и фамилия обязательны',
        [ValidateProfileError.INCORRECT_AGE]: 'Некорректный возраст',
    };

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            void dispatch(fetchProfileData());
        }
    }, [dispatch]);

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({firstname: value || ''}));
    }, [dispatch]);

    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}));
    }, [dispatch]);

    const onChangeAge = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({age: Number(value || '')}));
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
        {validateErrors?.length && validateErrors.map(err => (
            <Text theme={TextTheme.ERROR} text={t(validateErrorTranslates[err])} key={err}/>
        ))}
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
