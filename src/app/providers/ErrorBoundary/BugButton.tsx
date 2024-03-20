import {useState, type ReactNode, useEffect} from 'react';
import {Button} from '@/shared/ui/Button/Button';

export function BugButton(): ReactNode {
    const [error, setError] = useState(false);

    function dropErr() {
        setError(true);
    }

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return <Button onClick={dropErr}>
        293
    </Button>;
}
