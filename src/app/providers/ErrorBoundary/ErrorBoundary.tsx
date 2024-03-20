import {type ReactNode, type ErrorInfo, Suspense} from 'react';
import React from 'react';
import {PageError} from '@/widgets/PageError';

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        const {hasError} = this.state;
        const {children} = this.props;
        if (hasError) {
        // You can render any custom fallback UI
            return <Suspense>
                <PageError />
            </Suspense>;
        }

        return children;
    }
}

export default ErrorBoundary;

