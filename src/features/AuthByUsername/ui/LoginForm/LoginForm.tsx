import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames';
import {Button} from 'shared/ui/Button';
import {Input} from 'shared/ui/Input';
import cls from './LoginForm.module.scss';
import {loginActions} from 'features/AuthByUsername/model/slice/loginSlice';
import {getLoginState} from 'features/AuthByUsername/model/selectors/getLoginState/getLoginState';
import {Text, TextTheme} from 'shared/ui/Text';
import {loginByUsername} from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import {useAppDispatch} from 'app/providers/StoreProvider';

type LoginFormProps = {
    className?: string;
};

export const LoginForm = memo((props: LoginFormProps) => {
    const {className = ''} = props;

    const dispatch = useDispatch();

    const appDispatch = useAppDispatch();

    const {username, password, error, isLoading} = useSelector(getLoginState);

    const {t} = useTranslation();

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        void appDispatch(loginByUsername({username, password}));
    }, [appDispatch, username, password]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            {error ? <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR}/> : undefined}
            <Input className={cls.input} value={username} type='text' placeholder={t('Введите username')} onChange={onChangeUsername}/>
            <Input className={cls.input} value={password} type='text' placeholder={t('Введите password')} onChange={onChangePassword}/>
            <Button className={cls.loginBtn} disabled={isLoading} onClick={onLoginClick}>
                {t('Войти')}
            </Button>
        </div>
    );
});
