# Therapist Login Guide

## How to Login as a Therapist

### Option 1: From Welcome Screen
1. Open the OMBARO application
2. On the Welcome screen, scroll down to the portal access buttons
3. Click on the **"Therapist"** button
4. You'll be redirected to the Therapist Login screen

### Option 2: Direct Navigation
- The therapist login is accessible via the route: `therapistLogin`

## Login Credentials

### Demo Account
For testing purposes, you can use these demo credentials:

```
Email: priya.sharma@example.com
Password: therapist123
```

**Note:** In the current implementation, any email/password combination will work as this is using mock authentication. The system will log you in as "Priya Sharma" (demo therapist).

## After Login

Once logged in, you'll be redirected to the **Therapist Dashboard** which includes:

1. **Profile Overview**
   - Your name and specializations
   - Current availability status
   - Rating and reviews

2. **Performance Metrics**
   - Today's tasks count
   - Completion rate
   - Average rating
   - Total earnings

3. **Quick Actions**
   - View My Assignments
   - Manage Schedule
   - Update Location
   - Request Leave

4. **Today's Assignments**
   - List of scheduled tasks for the day
   - Customer details
   - Service location
   - Time and status

## How Therapist Accounts are Created

### Important: Therapists Cannot Self-Register

Therapist accounts are **created by vendors only**. Here's the process:

1. **Vendor Creates Therapist Account**
   - Vendor logs into their dashboard
   - Navigates to "Therapist Management"
   - Clicks "Add Therapist"
   - Fills in therapist details:
     - Name
     - Email
     - Mobile number
     - Specializations
     - Certifications
     - Years of experience
   - Saves the therapist profile

2. **Therapist Receives Credentials**
   - The vendor provides the email and initial password to the therapist
   - Therapist can then login using those credentials

3. **First Login**
   - Therapist logs in with provided credentials
   - Can view their dashboard
   - Can start accepting assignments

## Real Implementation (with Supabase)

When connecting to a real Supabase database:

### 1. Apply the Migration
First, apply the therapist management migration:
```sql
-- This creates the therapists table and related tables
-- File: /supabase/migrations/20250102_therapist_management.sql
```

### 2. Create Therapist via Vendor Panel
```typescript
// Vendor creates a therapist
const { data, error } = await supabase
  .from('therapists')
  .insert({
    vendor_id: vendorId,
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    mobile: '9876543210',
    specialization: ['Swedish Massage', 'Deep Tissue'],
    experience_years: 5,
    certification: ['Certified Massage Therapist'],
    status: 'active'
  });
```

### 3. Therapist Login Query
```typescript
// Validate therapist credentials
const { data: therapist, error } = await supabase
  .from('therapists')
  .select('*')
  .eq('email', email)
  .maybeSingle();

if (therapist) {
  // Login successful
  // Store therapist data in session
}
```

### 4. Update Login Flow
The current implementation uses mock data. To connect with Supabase:

```typescript
// In TherapistLoginScreen component
onLogin={async (credentials) => {
  const { data: therapist, error } = await supabase
    .from('therapists')
    .select('*')
    .eq('email', credentials.email)
    .maybeSingle();

  if (error || !therapist) {
    console.error('Login failed:', error);
    return;
  }

  // Password validation would happen here
  // In production, you'd hash passwords and use Supabase Auth

  // Navigate to dashboard with therapist data
  setCurrentStep('therapistDashboard');
}}
```

## Navigation Flow

```
Welcome Screen
    ↓
[Click "Therapist"]
    ↓
Therapist Login Screen
    ↓
[Enter Credentials]
    ↓
Therapist Dashboard
    ↓
[Quick Actions]
    ├── My Assignments
    ├── Schedule
    ├── Location Tracking
    └── Leave Requests
```

## Features Available to Therapists

### Dashboard Features
- ✅ View assigned tasks
- ✅ Check today's schedule
- ✅ View performance metrics
- ✅ Update availability status
- ✅ Track earnings and ratings

### Assignment Management (Coming Soon)
- View assignment details
- Accept/decline assignments
- Update task status (assigned → in_progress → completed)
- Add notes for completed services

### Schedule Management (Coming Soon)
- Set weekly availability
- Define working hours per day
- Mark unavailable dates

### Leave Management (Coming Soon)
- Apply for leave
- View leave status
- Check approved leaves

### Location Tracking (Coming Soon)
- Share real-time location during service
- GPS accuracy monitoring
- Battery level tracking

## Security Features

### Row Level Security (RLS)
The therapists table has RLS policies that ensure:
- Therapists can only view their own profile
- Vendors can only manage their own therapists
- Customers can only view basic info of assigned therapists

### Authentication
Currently using mock authentication. For production:
1. Use Supabase Auth for secure authentication
2. Hash passwords using bcrypt or similar
3. Implement JWT tokens for session management
4. Add password reset functionality

## Troubleshooting

### Cannot See Therapist Button
- Ensure you're on the Welcome screen
- The therapist button is in the bottom portal access section
- It's in a 3-column grid layout

### Login Not Working
- In demo mode, any credentials work
- Check browser console for errors
- Ensure components are properly imported in App.tsx

### After Login, Dashboard Not Showing
- Check that 'therapistDashboard' case is in the switch statement
- Verify TherapistDashboardScreen component is imported
- Check browser console for errors

## Testing the Flow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Application**
   - Open http://localhost:5173 (or your dev server URL)

3. **Click "Therapist" Portal**
   - On welcome screen, find the therapist button

4. **Use Demo Credentials**
   - Email: priya.sharma@example.com
   - Password: therapist123

5. **Verify Dashboard Loads**
   - Should see profile, stats, and quick actions
   - Check that all sections render correctly

## Next Steps for Full Implementation

1. **Connect Supabase Authentication**
   - Set up Supabase Auth
   - Create auth users when therapists are created
   - Link auth users to therapist records

2. **Implement Real Login**
   - Replace mock authentication with actual Supabase queries
   - Add password validation
   - Handle login errors properly

3. **Add Password Management**
   - Initial password generation
   - Password reset flow
   - Change password functionality

4. **Complete Feature Implementation**
   - Assignment management screens
   - Schedule management interface
   - Leave request workflow
   - Real-time location tracking

5. **Add Notifications**
   - Push notifications for new assignments
   - SMS alerts for schedule changes
   - Email notifications for leave approvals

## Support

For issues or questions:
- Check the THERAPIST_SYSTEM_IMPLEMENTATION.md file
- Review the component code in `/src/components/therapist/`
- Check the database schema in `/supabase/migrations/`
