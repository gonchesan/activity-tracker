import { Activity } from '@/models/activity';
import { supabase } from './supabase';

class ActivityService {
  async getActivityList(createdDate: string, userId: string): Promise<Activity[]> {
    const { data } = await supabase
      .from('activities')
      .select()
      .eq('user_id', userId)
      .gte('updated_date', `${createdDate.substring(0, 10)}T00:00:00.000Z`) // Greater than or equal to the start of the day
      .lte('updated_date', `${createdDate.substring(0, 10)}T23:59:59.999Z`) // Less than or equal to the end of the day
      .order('updated_date', { ascending: true });

    return data as Activity[];
  }
  async createActivity(params: Partial<Activity>) {
    const { data, error } = await supabase.from('activities').insert([params]).select();

    return { data, error };
  }
  async editActivity(params: Partial<Activity>, activityID: string, userID: string) {
    const { data, error } = await supabase
      .from('activities')
      .update(params)
      .eq('user_id', userID)
      .eq('id', activityID)
      .select();

    return { data, error };
  }
  async deleteActivity(activityID: string, userID: string) {
    const { error } = await supabase.from('activities').delete().eq('user_id', userID).eq('id', activityID);

    return { error };
  }
}
export const activityService = new ActivityService();
