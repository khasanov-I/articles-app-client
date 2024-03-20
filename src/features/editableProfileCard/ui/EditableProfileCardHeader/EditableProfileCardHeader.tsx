import {useCallback, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {Button} from '@/shared/ui/Button/Button';
import {Text} from '@/shared/ui/Text/Text';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@/app/providers/StoreProvider';
import {ButtonTheme} from '@/shared/ui/Button/Button';
import {getUserAuthData} from '@/entities/User';
import {HStack} from '@/shared/ui/Stack/HStack/HStack';
import {getProfileReadOnly} from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import {getProfileData} from '../../model/selectors/getProfileData/getProfileData';
import {profileActions} from '../../model/slice/profileSlice';
import {updateProfileData} from '../../model/services/updateProfileData/updateProfileData';

type EditableProfileCardHeaderProps = {
    className?: string;
};

export function EditableProfileCardHeader(props: EditableProfileCardHeaderProps): ReactNode {
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

    return <HStack max justify='between' className={classNames('', {}, [className])}>
        <Text title={t('Профиль')}/>
        {canEdit && <div>
            {readonly ? (
                <Button onClick={onEdit}
                    data-testid='EditableProfileCardHeader.EditButton'>
                    {t('Редактировать')}
                </Button>
            )
                : (
                    <>
                        <HStack gap='8'>
                            <Button
                                theme={ButtonTheme.RED}
                                onClick={onCancelEdit}
                                data-testid='EditableProfileCardHeader.CancelButton'>
                                {t('Отменить')}
                            </Button>
                            <Button
                                onClick={onSave}
                                data-testid='EditableProfileCardHeader.SaveButton'>
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    </>
                )}
        </div>}
    </HStack>;
}
