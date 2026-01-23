import { supabase } from './supabase';

export async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('posted_date', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  return data;
}