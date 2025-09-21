import { createClient } from '@supabase/supabase-js';

// Support both Vite and (potential) Next-style envs.
const getEnv = (key) => {
  // For Vercel and local development with Next.js convention
  const nextPublicVar = import.meta.env[key];
  if (nextPublicVar) {
    return nextPublicVar;
  }

  // Fallback for Vite-specific convention (if still used somewhere, though we're moving away)
  if (key === 'NEXT_PUBLIC_SUPABASE_URL' && import.meta.env.VITE_SUPABASE_URL) {
    console.warn('Using VITE_SUPABASE_URL. Consider renaming to NEXT_PUBLIC_SUPABASE_URL for Vercel compatibility.');
    return import.meta.env.VITE_SUPABASE_URL;
  }
  if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY' && import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Using VITE_SUPABASE_ANON_KEY. Consider renaming to NEXT_PUBLIC_SUPABASE_ANON_KEY for Vercel compatibility.');
    return import.meta.env.VITE_SUPABASE_ANON_KEY;
  }

  // Fallback to process.env for Node.js/server contexts (e.g., build process)
  const processEnvVar = process.env[key];
  if (processEnvVar) {
    return processEnvVar;
  }

  // Warn if the environment variable is missing
  console.warn(`Environment variable ${key} is missing.`);
  return undefined;
};

const url = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const anonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

if (!url || !anonKey) {
  // Fail fast to surface misconfiguration during development
  console.warn('[supabaseClient] Missing Supabase public env. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or VITE_ equivalents) are set.');
}

export const supabase = createClient(url || '', anonKey || '');
