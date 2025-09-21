import { createClient } from '@supabase/supabase-js';

// Server-only client using service role key. NEVER expose to the browser.
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.warn('[supabaseAdmin] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. API endpoints will respond with configuration error until set.');
}

export const supabaseAdmin = (url && serviceRoleKey)
  ? createClient(url, serviceRoleKey, { auth: { persistSession: false } })
  : null;
