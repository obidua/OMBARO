const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vspkiuissuuesjsnnpqr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcGtpdWlzc3V1ZXNqc25ucHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNTM1ODAsImV4cCI6MjA3NTkyOTU4MH0.pcl5Z0DDpFj8Qu6J4KQZINUQTrJhIMalRTRlLyqIfRk'
);

const testUsers = [
  { mobile: 'employee321', email: 'employee@ombaro.com', role: 'employee' },
  { mobile: 'vendor321', email: 'vendor@ombaro.com', role: 'vendor' },
];

async function testLogins() {
  console.log('Testing login for roles...\n');

  for (const user of testUsers) {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('mobile', user.mobile)
      .eq('role', user.role)
      .maybeSingle();
    
    if (data) {
      console.log('Role:', user.role);
      console.log('  Found:', data.name);
      console.log('  Mobile:', data.mobile);
      console.log('  Ends with 321:', data.mobile.endsWith('321'));
      console.log('');
    }
  }
}

testLogins().catch(console.error);
