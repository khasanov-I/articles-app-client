import {HStack} from '../../../Stack/HStack/HStack';
import cls from './ListBox.module.scss';
import generalCls from '../../styles/styles.module.scss';
import {classNames} from '@/shared/lib/classNames';
import {Button} from '../../../Button/Button';
import {Fragment, type ReactNode} from 'react';
import {type DropdownDirection} from '@/shared/types/ui';
import {Listbox as HListBox} from '@headlessui/react';
import {mapDirectionClass} from '../../styles/const';

export type ListBoxItem = {
    value: string;
    content: ReactNode;
    disabled?: boolean;
};
type ListBoxProps = {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
};

export function ListBox(props: ListBoxProps) {
    const {className, value, defaultValue, onChange, items, readonly, direction = 'bottom right', label} = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap='4'>
            {label && <span>{`${label}`}</span>}
            <HListBox
                disabled={readonly}
                as='div'
                className={classNames(cls.ListBox, {}, [className])}
                value={value}
                onChange={onChange}>
                <HListBox.Button className={generalCls.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(generalCls.options, {}, optionsClasses)}>
                    {items?.map(item => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({active, selected}) => (
                                <li className={classNames(generalCls.item,
                                    {
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled,
                                    },
                                    [])}>
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}
