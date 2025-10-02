# Vendor Self-Signup and Approval Workflow Guide

## Overview
This guide covers the complete vendor self-signup and admin approval workflow in the OMBARO platform. Vendors can now register themselves, and admin/HR staff can review and approve their applications.

---

## Table of Contents
1. [Features](#features)
2. [Vendor Signup Flow](#vendor-signup-flow)
3. [Admin Approval Flow](#admin-approval-flow)
4. [Database Schema](#database-schema)
5. [Testing Guide](#testing-guide)

---

## Features

### Vendor Self-Registration
✅ **Multi-Step Signup Form**
- Step 1: Personal Information (Name, Email, Mobile, Password)
- Step 2: Business Information (Business Name, Type, Contact Details)
- Step 3: Business Address (Complete address with pincode)
- Step 4: Additional Details (GST, PAN, Years in Business, etc.)

✅ **Business Types Supported**
- Spa
- Salon
- Home Service
- Hotel Spa
- Wellness Center

✅ **Validation & Security**
- Email format validation
- 10-digit mobile number validation
- Strong password requirements (min 8 characters)
- GST and PAN number format validation
- Address validation with pincode

✅ **Application Tracking**
- Unique application ID
- Email confirmation
- Status notifications
- Application history

### Admin Approval System
✅ **Application Management Dashboard**
- View all vendor applications
- Filter by status (Pending, Under Review, Approved, Rejected)
- Search by business name, contact person, or email
- Statistics overview

✅ **Application Review**
- Detailed application view
- Business information
- Contact details
- Address information
- Documents (GST, PAN certificates)

✅ **Approval Actions**
- Approve: Creates vendor account automatically
- Reject: With reason for rejection
- Request Additional Information: Ask for more details
- Add admin notes

✅ **Automatic Vendor Creation**
- On approval, vendor record is automatically created
- User role updated to 'vendor'
- Notification sent to applicant
- Application history recorded

---

## Vendor Signup Flow

### Step 1: Access Signup
1. Open OMBARO app
2. Click "🏪 Become a Vendor Partner" button on welcome screen
3. Signup form opens

### Step 2: Personal Information
**Fields:**
- Full Name (required)
- Email (required, validated)
- Mobile Number (required, 10 digits)
- Password (required, min 8 characters)
- Confirm Password (must match)

**Validation:**
- Email format check
- Mobile number must be exactly 10 digits
- Password strength validation
- Password match confirmation

### Step 3: Business Information
**Fields:**
- Business Name (required)
- Business Type (dropdown: spa/salon/home_service/hotel_spa/wellness_center)
- Contact Person Name (required)
- Contact Mobile (required, 10 digits)
- Contact Email (required, validated)

### Step 4: Business Address
**Fields:**
- Address Line 1 (required)
- Address Line 2 (optional)
- City (required)
- State (required)
- Pincode (required, 6 digits)

### Step 5: Additional Details
**Fields:**
- GST Number (optional, 15 characters)
- PAN Number (optional, 10 characters)
- Years in Business (optional)
- Number of Staff (optional)
- Business Description (optional)
- Website (optional)

### Step 6: Submit & Confirmation
- Review all information
- Submit application
- Receive confirmation screen
- Application reference number generated
- Email confirmation sent

### Success Screen
**Information Displayed:**
- Success message
- Application reference number
- What happens next (3-step process)
- Expected review timeline (24-48 hours)
- Email confirmation notice
- Link to check application status
- Link to login for existing users

---

## Admin Approval Flow

### Step 1: Access Vendor Approvals
**As Admin:**
1. Login to admin dashboard
2. Click "Vendor Approvals" button in System Management section
3. Vendor approval screen opens

### Step 2: View Applications
**Dashboard Features:**
- Statistics cards showing:
  - Pending applications count
  - Under review count
  - Approved count
  - Rejected count
- Search functionality
- Status filter dropdown
- Applications table

### Step 3: Review Application
**Click "View Details" to see:**
- **Business Information**
  - Business name and type
  - GST and PAN numbers
  - Years in business
  - Number of staff
- **Contact Information**
  - Contact person name
  - Mobile number
  - Email address
- **Business Address**
  - Complete address with pincode
- **Business Description**
  - Detailed description of services

### Step 4: Take Action
**Three Options:**

#### Option 1: Approve Application
1. Click "Approve" button
2. Add optional approval note
3. Click "Confirm Approval"
4. System automatically:
   - Creates vendor record in database
   - Updates user role to 'vendor'
   - Sends approval notification email
   - Records action in history

#### Option 2: Request Additional Information
1. Click "Request Info" button
2. Specify what information is needed
3. Click "Confirm Request"
4. Applicant receives notification
5. Application status changed to "additional_info_required"

#### Option 3: Reject Application
1. Click "Reject" button
2. Provide rejection reason (required)
3. Click "Confirm Rejection"
4. Applicant receives rejection notification with reason
5. Application status changed to "rejected"

---

## Database Schema

### vendor_applications Table
```sql
CREATE TABLE vendor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  business_name text NOT NULL,
  business_type text NOT NULL,
  gst_number text,
  pan_number text,
  business_address jsonb NOT NULL,
  contact_person text NOT NULL,
  contact_mobile text NOT NULL,
  contact_email text NOT NULL,
  services_offered uuid[],
  operating_hours jsonb,
  years_in_business integer,
  number_of_staff integer,
  business_description text,
  website_url text,
  social_media jsonb,
  documents jsonb,
  application_status text DEFAULT 'pending',
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  rejection_reason text,
  additional_info_request text,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### vendor_application_history Table
```sql
CREATE TABLE vendor_application_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES vendor_applications(id),
  action text NOT NULL,
  performed_by uuid NOT NULL REFERENCES auth.users(id),
  status_from text,
  status_to text,
  notes text,
  created_at timestamptz DEFAULT now()
);
```

### Application Statuses
- **pending**: Newly submitted, awaiting review
- **under_review**: Being reviewed by admin
- **approved**: Approved and vendor account created
- **rejected**: Application rejected
- **additional_info_required**: More information needed from applicant

### Automatic Triggers
1. **History Tracking**: Automatically records all status changes
2. **Vendor Creation**: On approval, creates vendor record automatically
3. **Notifications**: Sends email notifications for status changes
4. **User Role Update**: Updates user profile role to 'vendor' on approval

---

## Testing Guide

### Test Vendor Signup
1. Open app and click "Become a Vendor Partner"
2. Fill in all required fields:
   - Personal info: test@vendor.com, 9876543210
   - Business info: Test Spa, contact details
   - Address: Complete address with pincode
   - Additional: GST/PAN (optional)
3. Submit application
4. Verify success screen appears
5. Check application reference number

### Test Admin Approval
1. Login as admin (any credentials in demo mode)
2. Click "Vendor Approvals" button
3. Verify statistics are displayed
4. Use search and filters
5. Click "View Details" on any application
6. Test each action:
   - Approve with notes
   - Request additional info
   - Reject with reason

### Test Automatic Vendor Creation
1. Approve a vendor application
2. Verify vendor record is created
3. Check user role is updated to 'vendor'
4. Verify applicant can now login as vendor

### Test Application History
1. Perform multiple actions on an application
2. Check history is recorded for each action
3. Verify timestamps and action details

---

## Row Level Security (RLS)

### Vendor Applications
- **Anyone can create**: Signup is open to all authenticated users
- **Vendors see own**: Can view their own applications
- **Vendors update own**: Can update pending/info-required applications
- **Admins see all**: Admin, HR, Directors can view all applications
- **Admins manage**: Can update, approve, reject applications

### Application History
- **Users see own**: Can view history of their own applications
- **Admins see all**: Can view all application history
- **Auto-created**: History records created automatically

---

## Notifications

### Email Notifications Sent
1. **Application Submitted**: Confirmation email with reference number
2. **Under Review**: Notification when admin starts review
3. **Approved**: Congratulations email with login instructions
4. **Rejected**: Rejection email with reason
5. **Info Required**: Email specifying needed information
6. **Resubmitted**: Confirmation when applicant updates application

### In-App Notifications
- Push notifications for status changes
- Real-time updates in notification center
- Badge count for unread notifications

---

## API Integration Points

### Vendor Signup Endpoint
```typescript
// Edge Function: vendor-signup
POST /functions/v1/vendor-signup

Body:
{
  personalInfo: { name, email, mobile, password },
  businessInfo: { businessName, businessType, contactPerson, contactMobile, contactEmail },
  address: { addressLine1, addressLine2, city, state, pincode },
  additionalInfo: { gstNumber, panNumber, yearsInBusiness, numberOfStaff, description, website }
}

Response:
{
  success: true,
  applicationId: "uuid",
  message: "Application submitted successfully"
}
```

### Admin Approval Endpoint
```typescript
// Edge Function: vendor-approval
POST /functions/v1/vendor-approval

Body:
{
  applicationId: "uuid",
  action: "approve" | "reject" | "info_required",
  notes: "string",
  rejectionReason?: "string",
  additionalInfoRequest?: "string"
}

Response:
{
  success: true,
  message: "Application approved/rejected/updated",
  vendorId?: "uuid" // If approved
}
```

---

## Migration File

**Location**: `supabase/migrations/20250102_vendor_onboarding.sql`

**Apply Migration:**
1. Go to Supabase dashboard
2. Navigate to SQL Editor
3. Paste migration file content
4. Run the migration
5. Verify tables are created
6. Check RLS policies are enabled

---

## Security Considerations

### Data Protection
- Passwords hashed using bcrypt
- Sensitive data (bank details) encrypted
- GST and PAN validated before storage
- Email verification required

### Access Control
- RLS policies enforce data isolation
- Only admins can approve applications
- Vendors can only see their own applications
- Application history immutable

### Audit Trail
- All actions logged in history table
- Timestamps for all operations
- User IDs recorded for accountability
- Notes preserved for compliance

---

## Troubleshooting

### Common Issues

**Issue: Signup form validation errors**
- Check email format
- Verify mobile number is exactly 10 digits
- Ensure password is at least 8 characters
- Confirm passwords match

**Issue: Application not appearing in admin dashboard**
- Check database connection
- Verify RLS policies are applied
- Check user is authenticated
- Confirm admin role assigned

**Issue: Vendor account not created on approval**
- Check trigger is enabled
- Verify vendor table exists
- Check for duplicate vendor records
- Review application logs

**Issue: Notifications not received**
- Verify email service configured
- Check notification table
- Confirm user email is verified
- Review edge function logs

---

## Future Enhancements

### Planned Features
- Document upload (GST certificate, PAN card, business license)
- Multi-step verification process
- Video call interview scheduling
- Background check integration
- Automated eligibility scoring
- Bulk approval for multiple applications
- Export applications to CSV/PDF
- Advanced filtering and sorting
- Application analytics dashboard
- Automated email templates

---

## Support

For questions or issues:
- Technical Support: tech@ombaro.com
- Vendor Support: vendor-support@ombaro.com
- Admin Help: admin-help@ombaro.com

---

**Last Updated**: January 2, 2025
**Version**: 1.0.0
**Feature**: Vendor Self-Signup & Admin Approval
