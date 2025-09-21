# CraftConnect Aid

This project integrates Supabase to enable registration, login, protected dashboard, and profile management for artisans.

## Environment variables
Create a `.env` file in the project root with the following variables:

Required (client)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Required (server)
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Placeholders (for later features)
- GEMINI_API_KEY
- GOOGLE_TRANSLATE_KEY

Note for Vite: also set the Vite equivalents so the browser can access them during development.
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

You can set both NEXT_PUBLIC_* and VITE_* to the same values.

## Development

Install dependencies and run both the frontend and the API server concurrently:

```
npm install
npm run dev
```

Vite dev server runs on http://localhost:8080 and proxies `/api/*` to the API server on http://localhost:8081.

## Supabase setup
1) Create a Supabase project at https://supabase.com and obtain your SUPABASE_URL and keys.
2) In the Supabase Dashboard -> SQL Editor, run the SQL from `scripts/create_tables.sql` (or copy below):

```
create extension if not exists "pgcrypto";
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
create table if not exists admin_prompts (
  id uuid primary key default gen_random_uuid(),
  key text unique,
  template_text text,
  placeholders jsonb,
  updated_at timestamptz default now()
);
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
```

## Seeding
Run the seed script to upsert initial admin prompts. Optionally create an admin user by setting ADMIN_EMAIL and ADMIN_PASSWORD in your .env before running:

```
node scripts/seed.js
```

Admin password rotation: update ADMIN_PASSWORD in env and re-run the seed script, or rotate in Supabase Auth dashboard (recommended) and update where stored.

## Registration flow
- The Register screen uses Supabase Auth to create a user with email+password.
- On success, it posts to `/api/profile/create` to insert a row in `profiles` using the Service Role key.
- Then the user is redirected to `/dashboard`.

## Login flow
- The Login screen authenticates with `signInWithPassword`.
- On success, it redirects to `/dashboard`.

## Dashboard protection
- The Dashboard checks for an active session; if missing, it redirects to `/login`.
- If present, it fetches the artisan profile by `user_id` and displays the business name.

## Troubleshooting
- gen_random_uuid() missing: enable extension with `create extension if not exists "pgcrypto";`
- CORS/origin: add http://localhost:8080 to Supabase Settings -> API -> Allowed Origins.
- Env not found: ensure .env has required keys; restart dev server after changes.
- Session not persisting: confirm anon key and URL are correct.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9090c34f-c438-42e1-9b44-b6ccf09bd871

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9090c34f-c438-42e1-9b44-b6ccf09bd871) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9090c34f-c438-42e1-9b44-b6ccf09bd871) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
