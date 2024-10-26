import {useAppDispatch} from '@/app/providers/StoreProvider';
import {classNames} from '@/shared/lib/classNames';
import {Button} from '@/shared/ui/Button/Button';
import {Input} from '@/shared/ui/Input/Input';
import {useCallback, type ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from './RegisterForm.module.scss';
import {getRegisterAvatar, getRegisterEmail, getRegisterError, getRegisterIsLoading, getRegisterPassword, getRegisterUsername} from '../../model/selectors/RegisterSelectors';
import {registerActions} from '../../model/slice/registerSlice';
import {register} from '../../model/services/register';
import {Text, TextTheme} from '@/shared/ui/Text/Text';

type RegisterContentProps = {
    userAgent?: 'desktop' | 'mobile';
};

const RegisterContent = (props: RegisterContentProps): ReactNode => {
    const {userAgent} = props;

    const isUserAgentMobile = userAgent === 'mobile';

    const dispatch = useDispatch();

    const appDispatch = useAppDispatch();

    const username = useSelector(getRegisterUsername);
    const password = useSelector(getRegisterPassword);
    const avatar = useSelector(getRegisterAvatar);
    const email = useSelector(getRegisterEmail);
    const error = useSelector(getRegisterError);
    const isLoading = useSelector(getRegisterIsLoading);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(registerActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(registerActions.setPassword(value));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(registerActions.setAvatar(value));
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(registerActions.setEmail(value));
    }, [dispatch]);

    const onRegisterClick = useCallback(async () =>
        appDispatch(register({username, password, avatar, email}))
    , [appDispatch, username, password, avatar, email]);

    return <div className={classNames(cls.LoginForm, {}, [])}>
        {error ? <Text text={error} theme={TextTheme.ERROR}/> : undefined}
        <span className={cls.text}>Введите имя пользователя:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={username} type='text' onChange={onChangeUsername}/>
        <span className={cls.text}>Введите пароль:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={password} type='text' onChange={onChangePassword}/>
        <span className={cls.text}>Введите почту:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={email} type='text' onChange={onChangeEmail}/>
        <span className={cls.text}>Введите ссылку на аватар:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={avatar} type='text' onChange={onChangeAvatar}/>
        <Button className={cls.loginBtn} disabled={isLoading} onClick={onRegisterClick}>
            Создать аккаунт
        </Button>
    </div>;
};

export default RegisterContent;
