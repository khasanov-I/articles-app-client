import React, {type InputHTMLAttributes, memo} from 'react';
import {type Mods, classNames} from '@/shared/lib/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

type InputProps = {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    readonly?: boolean;
} & HTMLInputProps;

export const Input = memo((props: InputProps) => {
    const {className = '', value, onChange, type = 'text', readonly, ...other} = props;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            <input value={value} onChange={onChangeHandler}
                className={cls.input} type={type} {...other} readOnly={readonly}/>
        </div>
    );
});
