import {type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import cls from './ProfileCard.module.scss';
import {Text} from 'shared/ui/Text';
import {Button} from 'shared/ui/Button';
import {Input} from 'shared/ui/Input';
import {useSelector} from 'react-redux';
import {getProfileData} from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import {getProfileError} from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import {getProfileIsLoading} from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';

type ProfileCardProps = {
    className?: string;
};

export function ProfileCard(props: ProfileCardProps): ReactNode {
    const {className = ''} = props;

    const {t} = useTranslation('profile');

    const data = useSelector(getProfileData);

    const error = useSelector(getProfileError);

    const isLoading = useSelector(getProfileIsLoading);

    return <div className={classNames(cls.ProfileCard, {}, [className])}>
        <div className={cls.header}>
            <Text title={t('Профиль')}/>
            <Button className={cls.editBtn}>
                {t('Редактировать')}
            </Button>
        </div>
        <div className={cls.data}>
            <Input
                className={cls.input}
                value={data?.firstname}
                placeholder={t('Ваше имя')}/>
            <Input
                className={cls.input}
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}/>
        </div>
    </div>;
}
