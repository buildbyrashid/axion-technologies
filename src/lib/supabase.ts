import { createClient } from '@supabase/supabase-js';

/**
 * Returns a Supabase client for server-side operations.
 * This client uses the SUPABASE_SERVICE_KEY and should NEVER be exposed to the browser.
 */
let supabaseInstance: any = null;

/**
 * Returns a Supabase client for server-side operations.
 * This client uses the SUPABASE_SERVICE_KEY and should NEVER be exposed to the browser.
 */
export function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Return a proxy or handle build-time gracefully if needed, 
    // but for now we just throw if actually called.
    throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_SERVICE_KEY');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}
