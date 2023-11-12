/* eslint-disable react/display-name */
import React, {type InputHTMLAttributes, memo} from 'react';
import {classNames} from 'shared/lib/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

type InputProps = {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
} & HTMLInputProps;

export const Input = memo((props: InputProps) => {
    const {className = '', value, onChange, type = 'text', ...other} = props;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            <input value={value} onChange={onChangeHandler}
                className={cls.input} type={type} {...other} />
        </div>
    );
});
