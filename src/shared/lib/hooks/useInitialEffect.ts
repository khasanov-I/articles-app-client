import {useEffect} from 'react';

export function useInitialEffect(callback: () => void) {
    const arr = ['storybook', 'jest'];

    useEffect(() => {
        if (!arr.includes(__PROJECT__)) {
            callback();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
