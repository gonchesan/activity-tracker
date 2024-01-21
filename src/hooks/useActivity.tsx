import React from 'react';
import { ActivityContext } from '@/context/ActivityContext';

export default function useActivity() {
    const activityContext = React.useContext(ActivityContext);
    if (!activityContext) {
        throw new Error('ActivityContext need a Provider');
    }

    return activityContext;
}
