import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames';
import {Button} from 'shared/ui/Button';
import {Input} from 'shared/ui/Input';
import cls from './LoginForm.module.scss';
import {loginActions, loginReducer} from 'features/AuthByUsername/model/slice/loginSlice';
import {Text, TextTheme} from 'shared/ui/Text';
import {loginByUsername} from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import {type AppDispatch} from 'app/providers/StoreProvider';
import {getLoginUsername} from 'features/AuthByUsername/model/selectors/getLoginState/getLoginUsername';
import {getLoginPassword} from 'features/AuthByUsername/model/selectors/getLoginState/getLoginPassword';
import {getLoginError} from 'features/AuthByUsername/model/selectors/getLoginState/getLoginError';
import {getLoginIsLoading} from 'features/AuthByUsername/model/selectors/getLoginState/getLoginIsLoading';
import {DynamicModuleLoader} from 'shared/lib/dynamicModuleLoader/dynamicModuleLoader';

export type LoginFormProps = {
    className?: string;
};

const LoginForm = memo((props: LoginFormProps) => {
    const {className = ''} = props;

    const initialReducers = {
        loginForm: loginReducer,
    };

    const dispatch: AppDispatch = useDispatch();

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

    const onLoginClick = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        dispatch(loginByUsername({username, password}));
    }, [dispatch, username, password]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                {error ? <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR}/> : undefined}
                <Input className={cls.input} value={username} type='text' placeholder={t('Введите username')} onChange={onChangeUsername}/>
                <Input className={cls.input} value={password} type='text' placeholder={t('Введите password')} onChange={onChangePassword}/>
                <Button className={cls.loginBtn} disabled={isLoading} onClick={onLoginClick}>
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
