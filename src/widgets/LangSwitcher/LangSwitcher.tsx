import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import {Button} from 'shared/ui/Button';
import cls from './LangSwitcher.module.scss';
import {ButtonTheme} from 'shared/ui/Button/Button';

type LangSwitcherProps = {
    className?: string;
};

export function LangSwitcher(props: LangSwitcherProps) {
    const {t, i18n} = useTranslation('bars');

    const {className = ''} = props;

    const toggle = async () => {
        await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return <Button className={classNames(cls.LangSwitcher, {}, [className])}
        theme={ButtonTheme.CLEAR} onClick={toggle}>{t('Язык')}</Button>;
}
