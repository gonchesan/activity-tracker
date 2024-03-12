import React from 'react';
import moment from 'moment-timezone';

import { activityService } from '@/services/activity';
import { getUserId } from '@/services/supabase';
import { getCurrentDayFormated, getTotalMinutesSpan } from '@/services/date';

import { Activity } from '@/models/activity';
import { ActivityContextProps } from '@/models/activity';
import useDatePicker from '@/hooks/useDatePicker';

export const ActivityContext = React.createContext<ActivityContextProps | null>(null);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { currentDate } = useDatePicker();

  async function getActivityList(date: string) {
    setIsLoading(true);

    try {
      const userID = (await getUserId()) as string;

      const result = await activityService.getActivityList(date, userID);
      setActivities(result);
    } catch (error) {
      console.log('🚀 ~ getAll ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function insertActivity(params: Partial<Activity>) {
    setIsLoading(true);

    try {
      const result = await activityService.createActivity(params);

      const date = currentDate ? currentDate : new Date();
      const dateID = getCurrentDayFormated(date);

      if (!result.error) {
        getActivityList(dateID);
      }

      return result;
    } catch (error) {
      console.log('🚀 ~ insertActivity ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteActivity(activityID: string) {
    setIsLoading(true);
    try {
      const userID = (await getUserId()) as string;

      const result = await activityService.deleteActivity(activityID, userID);

      const date = currentDate ? currentDate : new Date();
      const dateID = getCurrentDayFormated(date);

      if (!result.error) {
        getActivityList(dateID);
      }

      return result;
    } catch (error) {
      console.log('🚀 ~ insertActivity ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function editActivity(activityUpdated: Partial<Activity>, activityID: string) {
    setIsLoading(true);

    try {
      const userID = (await getUserId()) as string;
      const [hours, minutes] = activityUpdated.begin_time!.split(':');
      const timeSpan = getTotalMinutesSpan(activityUpdated.begin_time!, activityUpdated.end_time!);

      const formattedDate = moment(currentDate)
        .hours(Number(hours))
        .minutes(Number(minutes))
        .tz('America/Argentina/Buenos_Aires')
        .format();

      activityUpdated.updated_date = formattedDate;
      activityUpdated.time_span = timeSpan;

      const result = await activityService.editActivity(activityUpdated, activityID, userID);

      const date = currentDate ? currentDate : new Date();
      const dateID = getCurrentDayFormated(date);

      if (!result.error) {
        getActivityList(dateID);
      }

      return result;
    } catch (error) {
      console.log('🚀 ~ insertActivity ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ActivityContext.Provider
      value={{ isLoading, activities, getActivityList, insertActivity, deleteActivity, editActivity }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
