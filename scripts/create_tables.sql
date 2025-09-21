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
