import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import cls from './ProfileCard.module.scss';
import {Text, TextTheme} from 'shared/ui/Text/Text';
import {Input} from 'shared/ui/Input/Input';
import {type Profile} from 'entities/Profile/model/types/profile';
import {Loader} from 'shared/ui/Loader/Loader';
import {Avatar} from 'shared/ui/Avatar/Avatar';
import {type Currency, CurrencySelect} from 'entities/Currency';
import {CountrySelect, type Country} from 'entities/Country';
import {VStack} from 'shared/ui/Stack/VStack/VStack';
import {HStack} from 'shared/ui/Stack/HStack/HStack';

type ProfileCardProps = {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readOnly?: boolean;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
};

export function ProfileCard(props: ProfileCardProps): ReactNode {
    const {className = '', data, error, isLoading, readOnly, onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry} = props;

    const {t} = useTranslation('profile');

    if (error) {
        return <HStack justify='center' className={classNames(cls.ProfileCard, {}, [className])}>
            <Text theme={TextTheme.ERROR} title={t('Произошла ошибка при загрузке профиля')} text={t('Попробуйте обновить страницу')}/>
        </HStack>;
    }

    if (isLoading) {
        return <HStack justify='center' className={classNames(cls.ProfileCard, {}, [className])}>
            <Loader />
        </HStack>;
    }

    return <VStack gap='8' max className={classNames(cls.ProfileCard, {}, [className])}>
        <div>
            <Avatar src={data?.avatar} alt={t('Загрузка')} size={150}/>
        </div>
        <Input
            value={data?.firstname}
            placeholder={t('Ваше имя')}
            onChange={onChangeFirstname}
            readonly={readOnly}/>
        <Input
            value={data?.lastname}
            placeholder={t('Ваша фамилия')}
            onChange={onChangeLastname}
            readonly={readOnly}/>
        <Input
            value={data?.age}
            placeholder={t('Ваш возраст')}
            onChange={onChangeAge}
            readonly={readOnly}/>
        <Input
            value={data?.city}
            placeholder={t('Ваш город')}
            onChange={onChangeCity}
            readonly={readOnly}/>
        <Input
            value={data?.username}
            placeholder={t('Имя пользователя')}
            onChange={onChangeUsername}
            readonly={readOnly}/>
        <Input
            value={data?.avatar}
            placeholder={t('Ссылка на аватар')}
            onChange={onChangeAvatar}
            readonly={readOnly}/>
        <CurrencySelect
            value={data?.currency}
            onChange={onChangeCurrency}
            readOnly={readOnly}/>
        <CountrySelect
            value={data?.country}
            onChange={onChangeCountry}
            readOnly={readOnly}/>
    </VStack>;
}
