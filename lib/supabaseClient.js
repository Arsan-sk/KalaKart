import { createClient } from '@supabase/supabase-js';

// Support both Vite and (potential) Next-style envs.
const getEnv = (key) => {
  try {
    // Vite exposes only VITE_* keys to import.meta.env
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
        return import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
      }
      if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
        return import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      }
    }
  } catch (_) {}
  // Fallback to process.env for node/server contexts
  return process.env[key];
};

const url = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const anonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

if (!url || !anonKey) {
  // Fail fast to surface misconfiguration during development
  console.warn('[supabaseClient] Missing Supabase public env. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or VITE_ equivalents) are set.');
}

export const supabase = createClient(url || '', anonKey || '');
