import { PostgrestError } from '@supabase/supabase-js';

export type Activity = {
  id: string;
  begin_time: string;
  end_time: string;
  description: string;
  time_span: number;
  created_date: string;
  dateID: string;
  user_id: string;
  category: string;
};

export type ActivityContextProps = {
  activities: Activity[];
  getActivityList(dateID: string): Promise<void>;
  insertActivity(params: Partial<Activity>): Promise<
    | {
        data: any[] | null;
        error: PostgrestError | null;
      }
    | undefined
  >;
  deleteActivity(activityID: string): Promise<
    | {
        error: PostgrestError | null;
      }
    | undefined
  >;
  editActivity(
    activityUpdated: Partial<Activity>,
    activityID: string
  ): Promise<
    | {
        data: any[] | null;
        error: PostgrestError | null;
      }
    | undefined
  >;
  isLoading: boolean;
};
