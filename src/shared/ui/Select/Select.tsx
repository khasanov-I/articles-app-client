import {useMemo, type ReactNode, memo, type ChangeEvent} from 'react';
import {useTranslation} from 'react-i18next';
import {type Mods, classNames} from 'shared/lib/classNames';
import cls from './Select.module.scss';

export type SelectOption = {
    value: string;
    content: string;
};

export type SelectProps = {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
};

export const Select = memo((props: SelectProps): ReactNode => {
    const {className = '', label, options, value, onChange, readOnly} = props;

    const optionsList
    = useMemo(() => options?.map((opt: SelectOption) =>
        (<option className={cls.option} value={opt.value} key={opt.value}>
            {opt.content}
        </option>)), [options]);

    const mods: Mods = {};

    const {t} = useTranslation();

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    return <div className={classNames(cls.Wrapper, mods, [className])}>
        {label && (<span className={cls.label}>
            {label + '>'}
        </span>)}
        <select
            className={cls.select}
            value={value}
            onChange={onChangeHandler}
            disabled={readOnly}>
            {optionsList}
        </select>
    </div>;
});
