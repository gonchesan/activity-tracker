import { Activity } from '@/interface/activity';
import { supabase } from './supabase';

class ActivityService {
    async getActivityList(dateID: string, userId: string): Promise<Activity[]> {
        const { data } = await supabase
            .from('activities')
            .select()
            .eq('date_id', dateID)
            .eq('user_id', userId)
            .order('created_date', { ascending: true });

        return data as Activity[];
    }
    async createActivity(params: Partial<Activity>) {
        const { data, error } = await supabase.from('activities').insert([params]).select();

        return { data, error };
    }
    async editActivity(params: Partial<Activity>, activityID: string, userID: string) {
        const { data, error } = await supabase.from('activities').update(params).eq('user_id', userID).eq('id', activityID).select();

        return { data, error };
    }
    async deleteActivity(activityID: string, userID: string) {
        const { error } = await supabase.from('activities').delete().eq('user_id', userID).eq('id', activityID);

        return { error };
    }
}
export const activityService = new ActivityService();
