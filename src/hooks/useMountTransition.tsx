import React from 'react';

const useMountTransition = (isMounted: boolean, unmountDelay = 1000) => {
    const [isTransitioning, setIsTransitioning] = React.useState(false);

    React.useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        if (isMounted && !isTransitioning) {
            setIsTransitioning(true);
        } else if (!isMounted && isTransitioning) {
            timeoutId = setTimeout(() => setIsTransitioning(false), unmountDelay);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [unmountDelay, isMounted, isTransitioning]);

    return isTransitioning;
};

export default useMountTransition;
