import {useMemo, type ReactNode, memo, type ChangeEvent} from 'react';
import {useTranslation} from 'react-i18next';
import {type Mods, classNames} from 'shared/lib/classNames';
import cls from './Select.module.scss';

export type SelectOption<T extends string> = {
    value: T;
    content: string;
};

export type SelectProps<T extends string> = {
    className?: string;
    label?: string;
    options?: Array<SelectOption<T>>;
    value?: T;
    onChange?: (value: T) => void;
    readOnly?: boolean;
};

export const Select = <T extends string>(props: SelectProps<T>): ReactNode => {
    const {className = '', label, options, value, onChange, readOnly} = props;

    const optionsList
    = useMemo(() => options?.map((opt: SelectOption<T>) =>
        (<option className={cls.option} value={opt.value} key={opt.value}>
            {opt.content}
        </option>)), [options]);

    const mods: Mods = {};

    const {t} = useTranslation();

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
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
};
