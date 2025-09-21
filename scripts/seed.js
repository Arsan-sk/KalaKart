#!/usr/bin/env node
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load env from .env and .env.local
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.');
  process.exit(1);
}

const supabaseAdmin = createClient(url, serviceKey, { auth: { persistSession: false } });

async function seedAdminPrompts() {
  const payload = [
    {
      key: 'catalog_description',
      template_text: 'Write a product title and a 2-paragraph product description in {{language}} for a handmade {{product_category}} by {{business}} ...',
      placeholders: { business: '', product_category: '', language: '' },
    },
  ];

  const { data, error } = await supabaseAdmin.from('admin_prompts').upsert(payload).select();
  if (error) throw error;
  console.log('Seeded admin_prompts:', data);
}

async function createAdminUserIfConfigured() {
  // Optional: create admin user via API if ADMIN_EMAIL and ADMIN_PASSWORD are provided
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    console.log('ADMIN_EMAIL/ADMIN_PASSWORD not set; skip creating admin user. You can create via Supabase Dashboard.');
    return;
  }
  try {
    // Available in supabase-js v2: auth.admin.createUser
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { role: 'admin' },
    });
    if (error) throw error;
    console.log('Admin user created:', { id: data.user?.id, email: data.user?.email });
  } catch (err) {
    console.error('Admin user creation failed:', err.message || err);
  }
}

(async () => {
  try {
    await seedAdminPrompts();
    await createAdminUserIfConfigured();
    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
})();
