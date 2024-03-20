import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {Button} from '@/shared/ui/Button/Button';
import cls from './LangSwitcher.module.scss';
import {ButtonTheme} from '@/shared/ui/Button/Button';
import {type ReactNode, memo} from 'react';

type LangSwitcherProps = {
    className?: string;
};

export const LangSwitcher = memo((props: LangSwitcherProps): ReactNode => {
    const {t, i18n} = useTranslation('bars');

    const {className = ''} = props;

    const toggle = async () => {
        await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return <Button className={classNames(cls.LangSwitcher, {}, [className])}
        theme={ButtonTheme.IMAGE_BUTTON} onClick={toggle}>{t('Язык')}</Button>;
});
