import dotenv from 'dotenv';

// Load env FIRST before any other imports
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

// Now import other modules
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

// Create supabase admin client after env is loaded
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseAdmin = null;
if (url && serviceRoleKey) {
  supabaseAdmin = createClient(url, serviceRoleKey, { auth: { persistSession: false } });
  console.log('[server] Supabase admin client initialized successfully');
} else {
  console.warn('[server] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. API endpoints will respond with configuration error until set.');
}

const app = express();
const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(express.json());

// Simple in-memory rate limiter (per IP) for prototype purposes.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 60; // 60 requests/minute per IP
const hits = new Map();

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = hits.get(ip) || { count: 0, reset: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + RATE_LIMIT_WINDOW_MS;
  }

  entry.count += 1;
  hits.set(ip, entry);

  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests, please try again later.' });
  }
  res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX.toString());
  res.setHeader('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT_MAX - entry.count).toString());
  res.setHeader('X-RateLimit-Reset', Math.floor(entry.reset / 1000).toString());
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: {
    hasUrl: Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  }});
});

// Profile creation endpoint using service role key.
app.post('/api/profile/create', async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  if (!supabaseAdmin) {
    return res.status(500).json({ error: 'Server not configured: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' });
  }

  try {
    const payload = req.body || {};
    if (!payload.user_id) {
      return res.status(400).json({ error: 'Missing user_id' });
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert([{ 
        user_id: payload.user_id,
        business_name: payload.business_name || null,
        craft_category: payload.craft_category || null,
        location: payload.location || null,
        social_links: payload.social_links || null,
        language_pref: payload.language_pref || 'en',
      }])
      .select();

    if (error) {
      console.error('Profile insert error:', error);
      return res.status(500).json({ error: error.message || error });
    }
    return res.json({ data });
  } catch (err) {
    console.error('Profile create exception:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
