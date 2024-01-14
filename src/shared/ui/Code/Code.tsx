import {memo, useCallback, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import cls from './Code.module.scss';
import {classNames} from 'shared/lib/classNames';
import {Button} from '../Button/Button';

type CodeProps = {
    className?: string;
    text: string;
};

export const Code = memo((props: CodeProps): ReactNode => {
    const {className = '', text} = props;

    const onCopy = useCallback(() => {
        void navigator.clipboard.writeText(text);
    }, [text]);

    const {t} = useTranslation('article-details');

    return <pre className={classNames(cls.Code, {}, [className])}>
        <Button onClick={onCopy} className={cls.copyBtn}>{t('Копировать')}</Button>
        <code>
            {text}
        </code>
    </pre>;
});
