import {useAppDispatch} from '@/app/providers/StoreProvider';
import {classNames} from '@/shared/lib/classNames';
import {Button} from '@/shared/ui/Button/Button';
import {Input} from '@/shared/ui/Input/Input';
import {Text, TextTheme} from '@/shared/ui/Text/Text';
import {useCallback, type ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLoginPassword} from '../../model/selectors/getLoginState/getLoginPassword';
import {getLoginUsername} from '../../model/selectors/getLoginState/getLoginUsername';
import {getLoginIsLoading} from '../../model/selectors/getLoginState/getLoginIsLoading';
import {getLoginError} from '../../model/selectors/getLoginState/getLoginError';
import {useTranslation} from 'react-i18next';
import {loginActions} from '../../model/slice/loginSlice';
import {loginByUsername} from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';

type LoginContentProps = {
    userAgent?: 'desktop' | 'mobile';
};

const LoginContent = (props: LoginContentProps): ReactNode => {
    const {userAgent} = props;

    const isUserAgentMobile = userAgent === 'mobile';

    const dispatch = useDispatch();

    const appDispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const {t} = useTranslation();

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        await appDispatch(loginByUsername({username, password}));
    }, [appDispatch, username, password]);

    return <div className={classNames(cls.LoginForm, {}, [])}>
        {error ? <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR}/> : undefined}
        <span className={cls.text}>Введите имя пользователя:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={username} type='text' onChange={onChangeUsername}/>
        <span className={cls.text}>Введите пароль:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={password} type='text' onChange={onChangePassword}/>
        <Button className={cls.loginBtn} disabled={isLoading} onClick={onLoginClick}>
            {t('Войти')}
        </Button>
    </div>;
};

export default LoginContent;
