#!/usr/bin/env node
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load env from .env.local
dotenv.config({ path: '.env.local' });

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabaseAdmin = createClient(url, serviceKey, { auth: { persistSession: false } });

const createTablesSQL = `
-- Enable pgcrypto for gen_random_uuid()
create extension if not exists "pgcrypto";

-- profiles
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  business_name text,
  craft_category text,
  location text,
  social_links jsonb,
  language_pref text,
  profile_pic_url text,
  created_at timestamptz default now()
);

-- admin_prompts
create table if not exists admin_prompts (
  id uuid primary key default gen_random_uuid(),
  key text unique,
  template_text text,
  placeholders jsonb,
  updated_at timestamptz default now()
);

-- products (prototype)
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid references profiles(id) on delete set null,
  title text,
  description text,
  price_range text,
  tags text[],
  images jsonb,
  created_at timestamptz default now()
);
`;

async function createTables() {
  try {
    console.log('Creating tables via SQL...');
    
    // Execute the SQL directly using the SQL editor endpoint
    const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql: createTablesSQL });
    
    if (error) {
      // If RPC doesn't exist, try another approach
      console.log('RPC failed, trying direct REST API...');
      
      const response = await fetch(`${url}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`
        },
        body: JSON.stringify({ query: createTablesSQL })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create tables: ${response.status} ${response.statusText}`);
      }
      
      console.log('Tables created successfully via REST API');
    } else {
      console.log('Tables created successfully via RPC');
    }
    
    // Test if tables exist by querying profiles
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .limit(1);
      
    if (profilesError && profilesError.code !== 'PGRST116') { // PGRST116 means empty result, which is OK
      console.error('Error testing profiles table:', profilesError);
    } else {
      console.log('✓ Profiles table is accessible');
    }
    
  } catch (err) {
    console.error('Error creating tables:', err.message || err);
    console.log('\nPlease create the tables manually in Supabase Dashboard > SQL Editor:');
    console.log('\n' + createTablesSQL);
  }
}

createTables();
