import {type ReactNode} from 'react';
import {classNames} from 'shared/lib/classNames';
import {Page} from 'widgets/Page/ui/Page';
import {VStack} from 'shared/ui/Stack/VStack/VStack';
import {EditableProfileCard} from 'features/editableProfileCard';
import {useParams} from 'react-router-dom';
import {Text, TextTheme} from 'shared/ui/Text/Text';
import {useTranslation} from 'react-i18next';

type ProfilePageProps = {
    className?: string;
};

function ProfilePage(props: ProfilePageProps): ReactNode {
    const {className = ''} = props;

    const {t} = useTranslation('profile');

    const {id} = useParams<{id: string}>();

    if (!id) {
        return <Text text={t('Профиль не найден')} theme={TextTheme.ERROR}/>;
    }

    return <Page className={classNames('', {}, [className])}>
        <VStack gap='16'>
            <EditableProfileCard id={id}/>
        </VStack>
    </Page>;
}

export default ProfilePage;
