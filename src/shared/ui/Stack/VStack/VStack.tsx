import {memo, type ReactNode} from 'react';
import {Flex, type FlexProps} from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = memo((props: VStackProps): ReactNode => {
    const {align = 'start'} = props;
    return <Flex direction='column' align={align} {...props}/>;
});
