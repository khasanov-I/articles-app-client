import {Menu} from '@headlessui/react';
import {Fragment, type ReactNode} from 'react';
import {classNames} from '@/shared/lib/classNames';
import {type DropdownDirection} from '@/shared/types/ui';
import {AppLink} from '@/shared/ui/AppLink/AppLink';
import cls from './Dropdown.module.scss';
import generalCls from '../../styles/styles.module.scss';
import {mapDirectionClass} from '../../styles/const';

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

export function Dropdown(props: DropdownProps) {
    const {className, items, trigger, direction = 'bottom left'} = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={generalCls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(generalCls.options, {}, optionsClasses)}>
                {items.map(({onClick, disabled, content, href}, index) => {
                    const item = ({active}: {active: boolean}) => (
                        <button
                            disabled={disabled}
                            onClick={onClick}
                            className={classNames(generalCls.item, {
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
