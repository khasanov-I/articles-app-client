import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import cls from './ProfileCard.module.scss';
import {Text, TextTheme} from '@/shared/ui/Text/Text';
import {Loader} from '@/shared/ui/Loader/Loader';
import {Avatar} from '@/shared/ui/Avatar/Avatar';
import {HStack} from '@/shared/ui/Stack/HStack/HStack';
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect';
import {fetchProfileData} from '../../model/services/fetchProfileData/fetchProfileData';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {getProfileAge, getProfileAvatar, getProfileCity, getProfileCountry, getProfileCurrency, getProfileFirstName, getProfileLastName, getProfileUsername} from '../../model/selectors/getProfileData/getProfileData';
import {getProfileError} from '../../model/selectors/getProfileError/getProfileError';
import {getProfileIsLoading} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import {NoAvatar} from '@/shared/assets/img';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';

type ProfileCardProps = {
    className?: string;
    id: string;
};

export function ProfileCard(props: ProfileCardProps): ReactNode {
    const {className = '', id} = props;

    const {t} = useTranslation('profile');

    const dispatch = useAppDispatch();

    const age = useSelector(getProfileAge);
    const city = useSelector(getProfileCity);
    const lastname = useSelector(getProfileLastName);
    const firstname = useSelector(getProfileFirstName);
    const currency = useSelector(getProfileCurrency);
    const country = useSelector(getProfileCountry);
    const avatar = useSelector(getProfileAvatar);
    const username = useSelector(getProfileUsername);

    const error = useSelector(getProfileError);

    const isLoading = useSelector(getProfileIsLoading);

    useInitialEffect(() => {
        if (id) {
            void dispatch(fetchProfileData(id));
        }
    });

    if (error) {
        return <HStack justify='center' className={classNames(cls.ProfileCard, {}, [className])}>
            <Text theme={TextTheme.ERROR} title={t('Произошла ошибка при загрузке профиля')} text={t('Попробуйте обновить страницу')}/>
        </HStack>;
    }

    if (isLoading ?? !username) {
        return <HStack justify='center' className={classNames(cls.ProfileCard, {}, [className])}>
            <Loader />
        </HStack>;
    }

    return <HStack align='start' gap='8' max className={classNames(cls.ProfileCard, {}, [className])}>
        <Avatar alt='not found' src={avatar ? `${__API__}/${avatar}` : NoAvatar as string} size={200}/>
        <VStack>
            <HStack>
                <span>{firstname + ' ' + lastname}</span>
            </HStack>
            <span>{'Возраст: ' + age}</span>
            <span>{'Место проживания: ' + city}</span>
            <span>{'Страна проживания: ' + country}</span>
        </VStack>
    </HStack>;
}
