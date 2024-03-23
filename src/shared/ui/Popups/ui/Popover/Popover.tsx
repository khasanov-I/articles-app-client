import {Popover as HPopover} from '@headlessui/react';
import {type ReactNode} from 'react';
import {type DropdownDirection} from '@/shared/types/ui';
import {mapDirectionClass} from '../../styles/const';
import {classNames} from '@/shared/lib/classNames';
import generalCls from '../../styles/styles.module.scss';

type PopoverProps = {
    className?: string;
    children: ReactNode;
    trigger: ReactNode;
    direction?: DropdownDirection;
};

export const Popover = (props: PopoverProps) => {
    const {trigger, children, direction = 'bottom right', className} = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return <HPopover className={classNames('', {}, [className])}>
        <HPopover.Button as='div' className={generalCls.trigger}>
            {trigger}
        </HPopover.Button>

        <HPopover.Panel className={classNames(generalCls.options, {}, optionsClasses)}>
            {children}
        </HPopover.Panel>
    </HPopover>;
};
