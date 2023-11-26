import {memo, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import cls from './PageError.module.scss';
import {classNames} from 'shared/lib/classNames';
import {Button} from 'shared/ui/Button';

type PageErrorProps = {
    className?: string;
};

export const PageError = memo((props: PageErrorProps): ReactNode => {
    function reloadPage() {
        location.reload();
    }

    const {className = ''} = props;

    const {t} = useTranslation('translation');

    return <div className={classNames(cls.PageError, {}, [className])}>
        {t('Ошибка')}
        <Button className={cls.button} onClick={reloadPage}>{t('Обновить')}</Button>
    </div>;
});
