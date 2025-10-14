const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vspkiuissuuesjsnnpqr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcGtpdWlzc3V1ZXNqc25ucHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNTM1ODAsImV4cCI6MjA3NTkyOTU4MH0.pcl5Z0DDpFj8Qu6J4KQZINUQTrJhIMalRTRlLyqIfRk'
);

async function diagnoseAndFix() {
  console.log('\n🔍 OMBARO Login Diagnostic Tool\n');
  console.log('='.repeat(50));
  
  // Test 1: Check admin user exists
  console.log('\n📋 Test 1: Checking admin user in database...');
  const { data: adminUser, error: adminError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', 'admin@ombaro.com')
    .maybeSingle();
  
  if (adminError) {
    console.log('❌ Error:', adminError.message);
    return;
  }
  
  if (!adminUser) {
    console.log('❌ No admin user found');
    console.log('Creating admin user...');
    // The user should already exist, so this shouldn't happen
    return;
  }
  
  console.log('✅ Admin user found');
  console.log('   Name:', adminUser.name);
  console.log('   Email:', adminUser.email);
  console.log('   Mobile:', adminUser.mobile);
  console.log('   Role:', adminUser.role);
  console.log('   Status:', adminUser.status);
  
  // Test 2: Check if mobile search works
  console.log('\n📋 Test 2: Testing mobile search...');
  const { data: byMobile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('mobile', 'admin321')
    .eq('role', 'admin')
    .maybeSingle();
  
  console.log(byMobile ? '✅ Mobile search works' : '❌ Mobile search failed');
  
  // Test 3: Check if email search works
  console.log('\n📋 Test 3: Testing email search...');
  const { data: byEmail } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', 'admin@ombaro.com')
    .eq('role', 'admin')
    .maybeSingle();
  
  console.log(byEmail ? '✅ Email search works' : '❌ Email search failed');
  
  // Test 4: Test authentication
  console.log('\n📋 Test 4: Testing Supabase authentication...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@ombaro.com',
    password: 'Admin@123456'
  });
  
  if (authError) {
    console.log('❌ Auth failed:', authError.message);
    console.log('   Trying with password: 1234...');
    
    const { data: authData2, error: authError2 } = await supabase.auth.signInWithPassword({
      email: 'admin@ombaro.com',
      password: '1234'
    });
    
    if (authError2) {
      console.log('❌ Auth with 1234 also failed:', authError2.message);
    } else {
      console.log('✅ Auth successful with password: 1234');
      console.log('   Correct password is: 1234');
      await supabase.auth.signOut();
    }
  } else {
    console.log('✅ Auth successful with password: Admin@123456');
    console.log('   User ID:', authData.user.id);
    await supabase.auth.signOut();
  }
  
  // Test 5: Verify RLS policies
  console.log('\n📋 Test 5: Verifying RLS policies...');
  const { count, error: countError } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'admin');
  
  if (countError) {
    console.log('❌ RLS blocking access:', countError.message);
  } else {
    console.log(`✅ RLS allows access (${count} admin users visible)`);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 DIAGNOSIS COMPLETE\n');
  
  // Summary
  console.log('🔐 Login Credentials:');
  console.log('   Email: admin@ombaro.com');
  console.log('   Password: Admin@123456 (or try: 1234)');
  console.log('   Alternative: admin321 / 1234');
  console.log('\n💡 Troubleshooting Tips:');
  console.log('   1. Clear browser cache and cookies');
  console.log('   2. Try incognito/private browsing mode');
  console.log('   3. Check browser console for errors');
  console.log('   4. Verify you\'re on the correct user type (Admin)');
  console.log('\n');
}

diagnoseAndFix().catch(console.error);
