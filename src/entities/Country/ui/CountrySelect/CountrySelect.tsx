import {Country} from 'entities/Country/model/types/country';
import {memo, useCallback, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/lib/classNames';
import {Listbox} from 'shared/ui/ListBox/ListBox';
import {Select, type SelectOption} from 'shared/ui/Select/Select';

type CountrySelectProps = {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readOnly?: boolean;
};

const options: Array<SelectOption<Country>> = [
    {value: Country.Armenia, content: Country.Armenia},
    {value: Country.Belarus, content: Country.Belarus},
    {value: Country.Kazahstan, content: Country.Kazahstan},
    {value: Country.Russia, content: Country.Russia},
    {value: Country.Ukraine, content: Country.Ukraine},
];

export const CountrySelect = memo((props: CountrySelectProps): ReactNode => {
    const {className = '', value, onChange, readOnly} = props;

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    const {t} = useTranslation('translation');

    return <Listbox
        className={classNames('', {}, [className])}
        defaultValue={t('Укажите страну')}
        label={t('Укажите страну')}
        items={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readOnly}
        direction='top right'/>;

    // Return <Select
    //     className={classNames('', {}, [className])}
    //     label={t('Укажите страну')}
    //     options={options}
    //     value={value}
    //     onChange={onChangeHandler}
    //     readOnly={readOnly}/>;
});
