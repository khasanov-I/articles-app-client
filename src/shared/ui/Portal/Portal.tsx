import {type ReactNode} from 'react';
import {createPortal} from 'react-dom';

type PortalProps = {
    children: ReactNode;
    element?: HTMLElement;
};

export function Portal(props: PortalProps): ReactNode {
    const {children, element = document.body} = props;
    return createPortal(children, element);
}
