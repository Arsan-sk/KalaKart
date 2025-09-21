#!/usr/bin/env node
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

async function setupDatabase() {
  console.log('Setting up database tables...');
  
  try {
    // Test connection first
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
      }
    });
    
    if (response.ok) {
      console.log('✓ Connected to Supabase successfully');
    } else {
      throw new Error(`Connection failed: ${response.status} ${response.statusText}`);
    }
    
    console.log('\n=== MANUAL SETUP REQUIRED ===');
    console.log('Please go to your Supabase Dashboard:');
    console.log(`1. Open: ${SUPABASE_URL.replace('//', '//app.')}/project/qikewhfnhkedpfdhcpmy`);
    console.log('2. Go to SQL Editor');
    console.log('3. Run this SQL:');
    console.log('\n');
    console.log(`-- Enable pgcrypto for gen_random_uuid()
create extension if not exists "pgcrypto";

-- profiles table
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  business_name text,
  craft_category text,
  location text,
  social_links jsonb,
  language_pref text default 'en',
  profile_pic_url text,
  created_at timestamptz default now()
);

-- Enable RLS (Row Level Security)
alter table public.profiles enable row level security;

-- Allow users to read their own profiles
create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = user_id);

-- Allow users to insert their own profile
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = user_id);

-- Allow users to update their own profile
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = user_id);

-- admin_prompts table
create table if not exists public.admin_prompts (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  template_text text,
  placeholders jsonb,
  updated_at timestamptz default now()
);

-- products table (prototype)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid references public.profiles(id) on delete set null,
  title text,
  description text,
  price_range text,
  tags text[],
  images jsonb,
  created_at timestamptz default now()
);

-- Enable RLS for products
alter table public.products enable row level security;

-- Allow users to read all products
create policy "Anyone can read products" on public.products
  for select using (true);

-- Allow users to manage their own products
create policy "Users can manage own products" on public.products
  for all using (artisan_id in (select id from public.profiles where user_id = auth.uid()));

-- Insert initial admin prompt
insert into public.admin_prompts (key, template_text, placeholders) 
values (
  'catalog_description',
  'Write a product title and a 2-paragraph product description in {{language}} for a handmade {{product_category}} by {{business}}. Focus on craftsmanship, cultural significance, and unique features.',
  '{"business": "", "product_category": "", "language": "en"}'::jsonb
) on conflict (key) do update set
  template_text = excluded.template_text,
  placeholders = excluded.placeholders,
  updated_at = now();`);
    
    console.log('\n4. After running the SQL, press Enter to continue...');
    
    // Wait for user input
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', () => {
      console.log('\n✓ Database setup should be complete!');
      console.log('Now you can test the registration and login flows.');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
