import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './EditableProfileCard.module.scss';
import {memo, useCallback} from 'react';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {useSelector} from 'react-redux';
import {ValidateProfileError} from '../../model/consts/consts';
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect';
import {getProfileError} from '../../model/selectors/getProfileError/getProfileError';
import {getProfileIsLoading} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import {getProfileReadOnly} from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import {getProfileForm} from '../../model/selectors/getProfileForm/getProfileForm';
import {getProfileValidateErrors} from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import {fetchProfileData} from '../../model/services/fetchProfileData/fetchProfileData';
import {profileActions, profileReducer} from '../../model/slice/profileSlice';
import {Currency} from '@/entities/Currency';
import {Country} from '@/entities/Country';
import {Text, TextTheme} from '@/shared/ui/Text/Text';
import {ProfileCard} from '@/entities/Profile';
import {DynamicModuleLoader, type ReducersList} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';
import {EditableProfileCardHeader} from '../EditableProfileCardHeader/EditableProfileCardHeader';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';

type EditableProfileCardProps = {
    className?: string;
    id: string;
};

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const {className, id} = props;

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

    useInitialEffect(() => {
        if (id) {
            void dispatch(fetchProfileData(id));
        }
    });

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

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack
                gap='8'
                max
                className={classNames(cls.EditableProfileCard, {}, [className])}>
                <EditableProfileCardHeader />
                {validateErrors?.length && validateErrors.map(err => (
                    <Text theme={TextTheme.ERROR}
                        text={t(validateErrorTranslates[err])}
                        key={err}
                        data-testid='EditableProfileCard.Error'/>
                ))}
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
            </VStack>
        </DynamicModuleLoader>
    );
});
