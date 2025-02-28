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
import {getProfileAge, getProfileAvatar, getProfileCity, getProfileCountry, getProfileFirstName, getProfileLastName, getProfileUsername} from '../../model/selectors/getProfileData/getProfileData';
import {getProfileError} from '../../model/selectors/getProfileError/getProfileError';
import {getProfileIsLoading} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import {NoAvatar} from '@/shared/assets/img';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';
// eslint-disable-next-line kh-i-start-plugin/layer-imports
import {fetchArticlesByProfile, getProfileArticles, getProfileArticlesError, getProfileArticlesIsLoading, getProfileMounted} from '@/pages/ProfilePage';
import {ArticleList, ArticleView} from '@/entities/Article';

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
    const country = useSelector(getProfileCountry);
    const avatar = useSelector(getProfileAvatar);
    const username = useSelector(getProfileUsername);

    const error = useSelector(getProfileError);

    const isLoading = useSelector(getProfileIsLoading);

    const articles = useSelector(getProfileArticles);
    const articlesError = useSelector(getProfileArticlesError);
    const articlesIsLoading = useSelector(getProfileArticlesIsLoading);
    const mounted = useSelector(getProfileMounted);

    useInitialEffect(() => {
        // If (id && !mounted) {
        void dispatch(fetchProfileData(id));
        void dispatch(fetchArticlesByProfile(id));
        // }
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

    return <VStack className={cls.content} gap='16'>
        <HStack align='start' gap='8' max className={classNames(cls.ProfileCard, {}, [className])}>
            <Avatar alt='not found' src={avatar ? `${__API__}/static/${avatar}` : NoAvatar as string} size={200}/>
            <VStack>
                <HStack>
                    <span>{firstname + ' ' + lastname}</span>
                </HStack>
                <span>{'Возраст: ' + age}</span>
                <span>{'Место проживания: ' + city}</span>
            </VStack>
        </HStack>
        {articlesIsLoading ? <Loader /> : null}
        {articlesError ? <Text theme={TextTheme.ERROR} text={'Произошла ошибка при загрузке статей'} /> : null}
        <ArticleList className={cls.list} view={ArticleView.BIG} articles={articles} />
    </VStack>;
}
