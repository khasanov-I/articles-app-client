import {Menu} from '@headlessui/react';
import {classNames} from 'shared/lib/classNames';
import cls from './Dropdown.module.scss';
import {Fragment, type ReactNode} from 'react';
import {type DropdownDirection} from 'shared/types/ui';
import {AppLink} from '../AppLink/AppLink';

export type DropdownItem = {
    disabled?: boolean;
    content: ReactNode;
    onClick?: () => void;
    href?: string;
};

type DropdownProps = {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
};

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
};

export function Dropdown(props: DropdownProps) {
    const {className, items, trigger, direction = 'bottom left'} = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, optionsClasses)}>
                {items.map(({onClick, disabled, content, href}, index) => {
                    const item = ({active}: {active: boolean}) => (
                        <button
                            disabled={disabled}
                            onClick={onClick}
                            className={classNames(cls.item, {
                                [cls.active]: active,
                            }, [])}>
                            {content}
                        </button>
                    );

                    if (href) {
                        return <Menu.Item
                            key={index}
                            as={AppLink}
                            to={href}
                            disabled={disabled}>
                            {item}
                        </Menu.Item>;
                    }

                    return <Menu.Item key={index}
                        as={Fragment}
                        disabled={disabled}>
                        {item}
                    </Menu.Item>;
                },
                )}
            </Menu.Items>
        </Menu>
    );
}
