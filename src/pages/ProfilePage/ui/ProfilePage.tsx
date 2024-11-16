import {type ReactNode} from 'react';
import {classNames} from '@/shared/lib/classNames';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';
import {useParams} from 'react-router-dom';
import {Text, TextTheme} from '@/shared/ui/Text/Text';
import {useTranslation} from 'react-i18next';
import {Page} from '@/widgets/Page';
import {ProfileCard, profileReducer} from '@/entities/Profile';
import {DynamicModuleLoader, type ReducersList} from '@/shared/lib/dynamicModuleLoader/dynamicModuleLoader';

type ProfilePageProps = {
    className?: string;
};

function ProfilePage(props: ProfilePageProps): ReactNode {
    const {className = ''} = props;

    const {t} = useTranslation('profile');

    const {id} = useParams<{id: string}>();

    const reducers: ReducersList = {
        profile: profileReducer,
    };

    if (!id) {
        return <Text text={t('Профиль не найден')} theme={TextTheme.ERROR}/>;
    }

    return <Page className={classNames('', {}, [className])}>
        <VStack gap='16'>
            <DynamicModuleLoader reducers={reducers}>
                <ProfileCard id={id} />
            </DynamicModuleLoader>
        </VStack>
    </Page>;
}

export default ProfilePage;
