const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vspkiuissuuesjsnnpqr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcGtpdWlzc3V1ZXNqc25ucHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNTM1ODAsImV4cCI6MjA3NTkyOTU4MH0.pcl5Z0DDpFj8Qu6J4KQZINUQTrJhIMalRTRlLyqIfRk'
);

const testUsers = [
  { mobile: 'admin321', email: 'admin@ombaro.com', role: 'admin' },
  { mobile: 'employee321', email: 'employee@ombaro.com', role: 'employee' },
  { mobile: 'vendor321', email: 'vendor@ombaro.com', role: 'vendor' },
  { mobile: 'therapist321', email: 'therapist@ombaro.com', role: 'therapist' },
  { mobile: 'beautician321', email: 'beautician@ombaro.com', role: 'beautician' },
  { mobile: 'customer321', email: 'customer@ombaro.com', role: 'customer' },
];

async function checkAllUsers() {
  console.log('\n=== Checking All User Profiles ===\n');
  
  for (const user of testUsers) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, name, mobile, email, role, status')
      .eq('mobile', user.mobile)
      .eq('role', user.role)
      .maybeSingle();
    
    if (error) {
      console.log(`❌ ${user.role.toUpperCase()}: Error - ${error.message}`);
    } else if (!data) {
      console.log(`❌ ${user.role.toUpperCase()}: NOT FOUND`);
    } else {
      console.log(`✅ ${user.role.toUpperCase()}: ${data.name}`);
      console.log(`   Mobile: ${data.mobile}`);
      console.log(`   Email: ${data.email}`);
      console.log(`   Status: ${data.status}`);
    }
    console.log('');
  }
}

checkAllUsers().catch(console.error);
