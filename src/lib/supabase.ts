import { createClient } from '@supabase/supabase-js';

/**
 * Returns a Supabase client for server-side operations.
 * This client uses the SUPABASE_SERVICE_KEY and should NEVER be exposed to the browser.
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_SERVICE_KEY');
  }

  return createClient(supabaseUrl, supabaseKey);
}
