import { Activity } from '@/interface/activity';
import { activityService } from '@/services/activity';
import { getUserId } from '@/services/supabase';
import React from 'react';
// import { useAuth } from './AuthContext';
import { getCurrentDayFormated, getTimeSpan } from '@/services/date';

import { ActivityProviderProps } from '@/interface/activity';

export const ActivityContext = React.createContext<ActivityProviderProps | null>(null);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
    const [activities, setActivities] = React.useState<Activity[]>([]);

    async function getActivityList(date: string) {
        try {
            const userID = (await getUserId()) as string;

            const result = await activityService.getActivityList(date, userID);
            setActivities(result);
        } catch (error) {
            console.log('🚀 ~ getAll ~ error:', error);
        }
    }

    async function insertActivity(params: Partial<Activity>) {
        console.log('🚀 ~ insertActivity ~ params:', params);
        try {
            const result = await activityService.createActivity(params);

            const date = new Date();
            const dateID = getCurrentDayFormated(date);

            if (!result.error) {
                getActivityList(dateID);
            }

            return result;
        } catch (error) {
            console.log('🚀 ~ insertActivity ~ error:', error);
        }
    }

    async function deleteActivity(activityID: string) {
        try {
            const userID = (await getUserId()) as string;

            const result = await activityService.deleteActivity(activityID, userID);

            const date = new Date();
            const dateID = getCurrentDayFormated(date);

            if (!result.error) {
                getActivityList(dateID);
            }

            return result;
        } catch (error) {
            console.log('🚀 ~ insertActivity ~ error:', error);
        }
    }

    async function editActivity(activityUpdated: Partial<Activity>, activityID: string) {
        try {
            const userID = (await getUserId()) as string;

            const createdDate = new Date();
            const [hours, minutes] = activityUpdated.begin_time!.split(':');

            const timeSpan = getTimeSpan(activityUpdated.begin_time!, activityUpdated.end_time!);

            createdDate.setHours(Number(hours));
            createdDate.setMinutes(Number(minutes));

            activityUpdated.created_date = createdDate.toISOString();

            activityUpdated.time_span = timeSpan;

            const result = await activityService.editActivity(activityUpdated, activityID, userID);

            const date = new Date();
            const dateID = getCurrentDayFormated(date);

            if (!result.error) {
                getActivityList(dateID);
            }

            return result;
        } catch (error) {
            console.log('🚀 ~ insertActivity ~ error:', error);
        }
    }

    return (
        <ActivityContext.Provider value={{ activities, getActivityList, insertActivity, deleteActivity, editActivity }}>
            {children}
        </ActivityContext.Provider>
    );
}
