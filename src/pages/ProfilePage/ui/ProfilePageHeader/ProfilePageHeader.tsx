import {useCallback, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import {Button} from 'shared/ui/Button/Button';
import {Text} from 'shared/ui/Text/Text';
import cls from './ProfilePageHeader.module.scss';
import {useSelector} from 'react-redux';
import {getProfileData, getProfileReadOnly, profileActions, updateProfileData} from 'entities/Profile';
import {useAppDispatch} from 'app/providers/StoreProvider';
import {ButtonTheme} from 'shared/ui/Button/Button';
import {getUserAuthData} from 'entities/User';

type ProfilePageHeaderProps = {
    className?: string;
};

export function ProfilePageHeader(props: ProfilePageHeaderProps): ReactNode {
    const {className = ''} = props;

    const readonly = useSelector(getProfileReadOnly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = String(authData?.id) === profileData?.id;
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadOnly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(async () => {
        await dispatch(updateProfileData());
    }, [dispatch]);

    const {t} = useTranslation('profile');

    return <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
        <Text title={t('Профиль')}/>
        {canEdit && <div className={cls.btnsWrapper}>
            {readonly ? (
                <Button className={cls.editBtn} onClick={onEdit}>
                    {t('Редактировать')}
                </Button>
            )
                : (
                    <>
                        <Button theme={ButtonTheme.RED} className={cls.cancelBtn} onClick={onCancelEdit}>
                            {t('Отменить')}
                        </Button>
                        <Button className={cls.saveBtn} onClick={onSave}>
                            {t('Сохранить')}
                        </Button>
                    </>
                )}
        </div>}
    </div>;
}
