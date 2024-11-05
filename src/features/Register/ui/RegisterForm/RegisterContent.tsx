import {useAppDispatch} from '@/app/providers/StoreProvider';
import {classNames} from '@/shared/lib/classNames';
import {Button} from '@/shared/ui/Button/Button';
import {Input} from '@/shared/ui/Input/Input';
import {useCallback, useState, type ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from './RegisterForm.module.scss';
import {getRegisterEmail, getRegisterIsLoading, getRegisterPassword, getRegisterUsername} from '../../model/selectors/RegisterSelectors';
import {registerActions} from '../../model/slice/registerSlice';
import {FileUpload} from '@/shared/ui/FileUpload/FileUpload';
import {sendMail} from '../../model/services/sendMail';

type RegisterContentProps = {
    userAgent?: 'desktop' | 'mobile';
};

const RegisterContent = (props: RegisterContentProps): ReactNode => {
    const {userAgent} = props;

    const isUserAgentMobile = userAgent === 'mobile';

    const dispatch = useDispatch();

    const appDispatch = useAppDispatch();

    const [avatar, setAvatar] = useState<File>();

    const username = useSelector(getRegisterUsername);
    const password = useSelector(getRegisterPassword);
    const email = useSelector(getRegisterEmail);
    const isLoading = useSelector(getRegisterIsLoading);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(registerActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(registerActions.setPassword(value));
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(registerActions.setEmail(value));
    }, [dispatch]);

    const onRegisterClick = useCallback(async () => {
        await appDispatch(sendMail({username, email, avatar, password}));
    }, [appDispatch, username, email, avatar, password]);

    return <div className={classNames(cls.LoginForm, {}, [])}>
        <span className={cls.text}>Введите имя пользователя:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={username} type='text' onChange={onChangeUsername}/>
        <span className={cls.text}>Введите пароль:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={password} type='text' onChange={onChangePassword}/>
        <span className={cls.text}>Введите почту:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={email} type='text' onChange={onChangeEmail}/>
        <span className={cls.text}>Загрузите аватар:</span>
        <FileUpload avatar={avatar} isAvatarLoaded={Boolean(avatar)} accept='image/*' setFile={setAvatar}>
            Загрузить изображение
        </FileUpload>
        <Button className={cls.loginBtn} disabled={isLoading} onClick={onRegisterClick}>
            Создать аккаунт
        </Button>
    </div>;
};

export default RegisterContent;
