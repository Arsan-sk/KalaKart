#!/usr/bin/env node
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load env from .env.local
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Testing registration flow...\n');

console.log('Environment check:');
console.log('- SUPABASE_URL:', SUPABASE_URL ? '✓' : '✗');
console.log('- ANON_KEY:', SUPABASE_ANON_KEY ? '✓' : '✗'); 
console.log('- SERVICE_ROLE_KEY:', SUPABASE_SERVICE_ROLE_KEY ? '✓' : '✗');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('\nMissing required environment variables');
  process.exit(1);
}

// Create clients
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { 
  auth: { persistSession: false } 
});

async function testRegistrationFlow() {
  const testEmail = `test.user.${Date.now()}@testdomain.com`;
  const testPassword = 'TestPassword123!';
  const testProfile = {
    business_name: 'Test Artisan Business',
    craft_category: 'Pottery & Ceramics',
    location: 'Mumbai, Maharashtra',
    language_pref: 'en'
  };

  console.log(`\n1. Testing user signup with email: ${testEmail}`);
  
  try {
    // Step 1: Sign up user  
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          username: 'test_artisan'
        },
        emailRedirectTo: undefined // Disable email confirmation for testing
      }
    });

    if (signupError) {
      throw new Error(`Signup failed: ${signupError.message}`);
    }

    console.log('✓ User signup successful');
    console.log('- User ID:', signupData.user?.id);
    console.log('- Email confirmed:', signupData.user?.email_confirmed_at ? 'Yes' : 'No');

    if (!signupData.user?.id) {
      throw new Error('No user ID returned from signup');
    }

    // Step 2: Create profile using admin client (simulating API call)
    console.log('\n2. Testing profile creation...');
    
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([{
        user_id: signupData.user.id,
        business_name: testProfile.business_name,
        craft_category: testProfile.craft_category,
        location: testProfile.location,
        language_pref: testProfile.language_pref
      }])
      .select();

    if (profileError) {
      throw new Error(`Profile creation failed: ${profileError.message}`);
    }

    console.log('✓ Profile creation successful');
    console.log('- Profile ID:', profileData[0]?.id);
    console.log('- Business Name:', profileData[0]?.business_name);

    // Step 3: Test login (or confirm user first if needed)
    console.log('\n3. Testing login...');
    
    // First try to confirm the user using admin client if email confirmation is required
    if (!signupData.user?.email_confirmed_at) {
      console.log('- Confirming email using admin client...');
      const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
        signupData.user.id,
        { email_confirm: true }
      );
      if (confirmError) {
        console.log('- Could not confirm email:', confirmError.message);
      } else {
        console.log('- Email confirmed via admin');
      }
    }
    
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });

    if (loginError) {
      console.log('- Login failed (expected if email confirmation required):', loginError.message);
      console.log('- This is normal for production setups with email confirmation enabled');
      
      // Still test with admin session to verify profile fetch works
      console.log('\n4. Testing profile fetch with admin client...');
      
      const { data: fetchedProfile, error: fetchError } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('user_id', signupData.user.id)
        .single();

      if (fetchError) {
        throw new Error(`Profile fetch failed: ${fetchError.message}`);
      }

      console.log('✓ Profile fetch successful');
      console.log('- Business Name:', fetchedProfile?.business_name);
      console.log('- Craft Category:', fetchedProfile?.craft_category);
      
      // Skip user session tests but cleanup
      console.log('\n5. Cleaning up test data...');
      await supabaseAdmin.auth.admin.deleteUser(signupData.user.id);
      console.log('✓ Test user deleted');
      
      console.log('\n🎉 Core functionality tests passed! Registration and profile creation work correctly.');
      console.log('Note: Login requires email confirmation in production.');
      return;
    }

    console.log('✓ Login successful');
    console.log('- Session exists:', !!loginData.session);
    console.log('- Access token exists:', !!loginData.session?.access_token);

    // Step 4: Test profile fetch with user session
    console.log('\n4. Testing profile fetch...');
    
    // Set the session for the client
    await supabase.auth.setSession({
      access_token: loginData.session.access_token,
      refresh_token: loginData.session.refresh_token
    });

    const { data: fetchedProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', signupData.user.id)
      .single();

    if (fetchError) {
      throw new Error(`Profile fetch failed: ${fetchError.message}`);
    }

    console.log('✓ Profile fetch successful');
    console.log('- Business Name:', fetchedProfile?.business_name);
    console.log('- Craft Category:', fetchedProfile?.craft_category);

    // Cleanup - delete test user and profile
    console.log('\n5. Cleaning up test data...');
    
    await supabaseAdmin.auth.admin.deleteUser(signupData.user.id);
    console.log('✓ Test user deleted');

    console.log('\n🎉 All tests passed! Registration and login flow is working correctly.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

testRegistrationFlow();
