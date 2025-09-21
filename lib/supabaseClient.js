import { createClient } from '@supabase/supabase-js';

// ✅ SERVER-ONLY CLIENT
if (typeof window !== 'undefined') {
  throw new Error('❌ [supabaseAdmin] This file is server-only and must not be imported in client-side code.');
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error(
    '[supabaseAdmin] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. ' +
    'Ensure these are set as environment variables in Vercel Project Settings or your local .env file.'
  );
}

export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});
