import {useAppDispatch} from '@/app/providers/StoreProvider';
import {classNames} from '@/shared/lib/classNames';
import {Button} from '@/shared/ui/Button/Button';
import {Input} from '@/shared/ui/Input/Input';
import {useCallback, useState, type ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from './RegisterForm.module.scss';
import {getPreventNextClick, getRegisterEmail, getRegisterErrors, getRegisterIsLoading, getRegisterPassword, getRegisterUsername, getSendMailError, getSendMailErrors, getSendMailLoading} from '../../model/selectors/RegisterSelectors';
import {registerActions} from '../../model/slice/registerSlice';
import {FileUpload} from '@/shared/ui/FileUpload/FileUpload';
import {sendMail} from '../../model/services/sendMail';
import {Loader} from '@/shared/ui/Loader/Loader';
import {Text, TextTheme} from '@/shared/ui/Text/Text';
import {profileActions} from '@/entities/Profile';
import {type Currency} from '@/entities/Currency';
import {type Country} from '@/entities/Country';
import {getProfileAge, getProfileCity, getProfileCountry, getProfileCurrency, getProfileFirstName, getProfileLastName} from '@/entities/Profile';

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
    const preventNextClick = useSelector(getPreventNextClick);
    const isExpectingForVerification = useSelector(getSendMailLoading);
    const registerError = useSelector(getRegisterErrors);
    const sendMailErrors = useSelector(getSendMailErrors);
    const unExpectedError = useSelector(getSendMailError);

    const age = useSelector(getProfileAge);
    const city = useSelector(getProfileCity);
    const lastname = useSelector(getProfileLastName);
    const firstname = useSelector(getProfileFirstName);
    const currency = useSelector(getProfileCurrency);
    const country = useSelector(getProfileCountry);

    const onChangeAge = useCallback((value: string) => {
        dispatch(profileActions.setAge(value));
    }, [dispatch]);

    const onChangeCity = useCallback((value: string) => {
        dispatch(profileActions.setCity(value));
    }, [dispatch]);

    const onChangeLastName = useCallback((value: string) => {
        dispatch(profileActions.setLastName(value));
    }, [dispatch]);

    const onChangeFirstName = useCallback((value: string) => {
        dispatch(profileActions.setFirstName(value));
    }, [dispatch]);

    const onChangeCurrency = useCallback((value: Currency) => {
        dispatch(profileActions.setCurrency(value));
    }, [dispatch]);

    const onChangeCountry = useCallback((value: Country) => {
        dispatch(profileActions.setCountry(value));
    }, [dispatch]);

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
        await appDispatch(sendMail({username, email, avatar, password,
            age,
            city,
            firstname,
            lastname,
            country,
            currency}));
    }, [appDispatch, username, email, avatar, password, age, city, firstname, lastname, country, currency]);

    return (isExpectingForVerification && !sendMailErrors && !registerError) ? <div>
        <span>Ожидается подтверждение по почте</span>
        <span>Если письмо не пришло, проверьте папку спама</span>
        <Loader />
    </div> : <div className={classNames(cls.LoginForm, {}, [])}>
        <Text text={unExpectedError} theme={TextTheme.ERROR} />
        <Text text={sendMailErrors?.unknownError} theme={TextTheme.ERROR} />
        <Text text={sendMailErrors?.usernameExists} theme={TextTheme.ERROR} />
        <Text text={sendMailErrors?.emailExists} theme={TextTheme.ERROR} />
        <span className={cls.text}>Введите имя пользователя:</span>
        <Text text={sendMailErrors?.username} theme={TextTheme.ERROR} />
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={username} type='text' onChange={onChangeUsername}/>
        <span className={cls.text}>Введите пароль:</span>
        <Text text={sendMailErrors?.password} theme={TextTheme.ERROR} />
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={password} type='text' onChange={onChangePassword}/>
        <span className={cls.text}>Введите почту:</span>
        <Text text={sendMailErrors?.email} theme={TextTheme.ERROR} />
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={email} type='text' onChange={onChangeEmail}/>
        <span className={cls.text}>Введите ваш возраст:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={age} type='number' onChange={onChangeAge}/>
        <span className={cls.text}>Введите ваше место проживания:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={city} type='text' onChange={onChangeCity}/>
        <span className={cls.text}>Введите ваше имя:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={firstname} type='text' onChange={onChangeFirstName}/>
        <span className={cls.text}>Введите вашу фамилию:</span>
        <Input className={classNames(cls.input, {[cls.mobileInput]: true}, [])} value={lastname} type='text' onChange={onChangeLastName}/>
        <span className={cls.text}>Загрузите аватар:</span>
        <FileUpload avatar={avatar} accept='image/*' setFile={setAvatar}>
            Загрузить изображение
        </FileUpload>
        <Button className={cls.loginBtn} disabled={preventNextClick} onClick={onRegisterClick}>
            Создать аккаунт
        </Button>
    </div>;
};

export default RegisterContent;
