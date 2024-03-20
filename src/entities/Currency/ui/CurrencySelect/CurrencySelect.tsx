import {Currency} from '../../model/consts/consts';
import {memo, useCallback, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from '@/shared/lib/classNames';
import {ListBox} from '@/shared/ui/Popups';
import {type SelectOption} from '@/shared/ui/Select/Select';

type CurrencySelectProps = {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readOnly?: boolean;
};

const options: Array<SelectOption<Currency>> = [
    {value: Currency.RUB, content: Currency.RUB},
    {value: Currency.EUR, content: Currency.EUR},
    {value: Currency.USD, content: Currency.USD},
];

export const CurrencySelect = memo((props: CurrencySelectProps): ReactNode => {
    const {className = '', value, onChange, readOnly} = props;

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    const {t} = useTranslation('translation');

    return <ListBox
        className={classNames('', {}, [className])}
        onChange={onChangeHandler}
        defaultValue={t('Укажите валюту')}
        label={t('Укажите валюту')}
        value={value}
        items={options}
        readonly={readOnly}
        direction='top right'/>;

    // Return <Select
    //     className={classNames('', {}, [className])}
    //     label={t('Укажите валюту')}
    //     options={options}
    //     value={value}
    //     onChange={onChangeHandler}
    //     readOnly={readOnly}/>;
});
