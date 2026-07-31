import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Handle fallback if environment variables are not yet replaced by user
const isPlaceholder = !supabaseUrl || supabaseUrl.includes('your-project-id') || !supabaseAnonKey || supabaseAnonKey.includes('your-anon-api-key');

export const supabase = createClient(
  isPlaceholder ? 'https://placeholder-url-please-setup-env.supabase.co' : supabaseUrl,
  isPlaceholder ? 'placeholder-key' : supabaseAnonKey
);

export const isSupabaseConfigured = () => {
  return !isPlaceholder;
};
