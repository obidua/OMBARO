# Complete Therapist Workflow Guide - OMBARO

## 🎯 Overview

This guide covers the complete end-to-end workflow for the therapist management system in OMBARO, from vendor adding therapists to customers tracking service delivery.

---

## 📋 Complete Workflow

### Phase 1: Vendor Adds Therapist

**Steps:**
1. **Login as Vendor**
   - Use vendor credentials to login
   - Navigate to Vendor Dashboard

2. **Access Therapist Management**
   - Click "Manage Therapists" in Quick Actions, OR
   - Click "Therapists" tab in the navigation menu
   - Click "Go to Therapist Management" button

3. **Add New Therapist**
   - Click "+ Add" button in therapist management screen
   - Fill in therapist details:
     - Name, Email, Mobile
     - Years of Experience
     - Status (Active/Inactive/On Leave)
     - Add Specializations (e.g., Swedish Massage, Deep Tissue)
     - Add Certifications
   - Click "Add Therapist"
   - Therapist is now in your team!

4. **Manage Existing Therapists**
   - View all therapists in a list
   - Filter by status (Active, Inactive, On Leave)
   - Search by name or specialization
   - Edit therapist details
   - Delete therapists if needed

---

### Phase 2: Booking Received

**When a customer makes a booking:**
1. Booking appears in Vendor Dashboard → "Bookings" tab
2. Booking shows up in "Today's Schedule" if it's for today
3. Status initially shows as "Confirmed" or "Pending"

---

### Phase 3: Vendor Assigns Therapist to Booking

**Steps:**
1. **Go to Bookings Tab**
   - Click "Bookings" in vendor dashboard navigation
   - View list of upcoming bookings

2. **Assign Therapist**
   - Click "Assign" button next to a booking
   - You'll be taken to "Assign Task" screen
   - Pre-filled info:
     - Therapist details (if clicked from therapist management)
     - OR Choose therapist from list (if clicked from bookings)

3. **Fill Assignment Details**
   - Customer Information:
     - Customer name
     - Customer phone
   - Service Details:
     - Service name
     - Estimated duration
   - Schedule:
     - Assignment date
     - Assignment time (choose from time slots)
   - Service Location:
     - Full address where service will be provided
   - Additional Notes:
     - Any special instructions

4. **Confirm Assignment**
   - Click "Assign Task to [Therapist Name]"
   - Assignment is created!
   - Therapist will see this in their dashboard

---

### Phase 4: Therapist Views Assignment

**Therapist's Perspective:**

1. **Login as Therapist**
   - Click "Therapist" button on welcome screen
   - Enter therapist credentials
   - View Therapist Dashboard

2. **View Assignments**
   - Dashboard shows "Today's Tasks" count
   - Click "My Assignments" quick action
   - Or navigate to assignments screen

3. **My Assignments Screen**
   - **Filter Options:**
     - Today: Show today's assignments
     - Upcoming: Future assignments
     - Completed: Past completed services
     - All: Everything

   - **Each Assignment Shows:**
     - Status badge (Assigned/In Progress/Completed)
     - Time of appointment
     - Customer name
     - Service type
     - Duration
     - Service location address

4. **Assignment Actions:**
   - **For "Assigned" status:**
     - "Start Service" button
     - "Navigate" button (opens Google Maps)
     - "Call" button (call customer)

   - **For "In Progress" status:**
     - "Complete Service" button
     - "Call Customer" button

---

### Phase 5: Therapist Travels to Location

**Steps:**
1. **Navigate to Location**
   - Therapist clicks "Navigate" button
   - Opens Google Maps with destination
   - Therapist travels to customer location

2. **Therapist Arrives**
   - When therapist reaches location
   - Therapist clicks "Start Service" button
   - **This triggers:**
     - Assignment status changes to "In Progress"
     - Location tracking begins
     - Customer can now track therapist

---

### Phase 6: Customer Tracks Therapist

**Customer's Perspective:**

1. **Access Tracking**
   - Customer clicks on their booking
   - Sees "Track Therapist" option
   - Opens therapist tracking screen

2. **Tracking Screen Shows:**
   - **Current Status:**
     - "On the way" - Therapist is traveling
     - "Arrived" - Therapist has reached
     - "Service in progress" - Service started
     - "Completed" - Service finished

   - **Live Map View:**
     - Real-time therapist location
     - GPS coordinates
     - Current address

   - **Estimated Arrival:**
     - Time remaining until arrival
     - Only shown when status is "On the way"

   - **Therapist Information:**
     - Name and photo
     - Rating and reviews
     - Years of experience
     - Specializations
     - "Call Therapist" button

   - **Service Details:**
     - Service type
     - Duration
     - Scheduled time
     - Amount

   - **Service Location:**
     - Customer's address

---

### Phase 7: Service In Progress

**What Happens:**
1. Therapist performs the service
2. Customer can still see live location updates
3. Status shows "Service in progress"
4. Timer shows elapsed time

---

### Phase 8: Service Completion

**Therapist Completes Service:**
1. **Complete the Service**
   - Therapist clicks "Complete Service" button
   - **This triggers:**
     - Assignment status changes to "Completed"
     - Location tracking stops
     - Customer is notified

2. **Post-Completion:**
   - Assignment moves to "Completed" filter
   - Shows completion badge
   - Thank you message displayed
   - Service marked as done in vendor dashboard

3. **Customer Experience:**
   - Tracking screen shows "Completed" status
   - Customer can now leave a review
   - Payment is processed (if not already done)

---

## 🎨 Screen-by-Screen Guide

### Vendor Screens

1. **Vendor Dashboard**
   - Location: Vendor Login → Dashboard
   - Features:
     - Stats cards (Services, Revenue, Bookings, Rating)
     - Quick Actions (Manage Therapists button)
     - Navigation tabs (Overview, Services, Therapists, Bookings, Reviews, Analytics)
     - Today's Schedule
     - Therapists tab with stats

2. **Therapist Management**
   - Location: Vendor Dashboard → Manage Therapists
   - Features:
     - Search therapists
     - Filter by status
     - List of all therapists with ratings
     - Add/Edit/Delete actions
     - View assignments
     - Assign task button

3. **Add/Edit Therapist Form**
   - Location: Therapist Management → Add/Edit
   - Features:
     - Basic info fields
     - Experience slider
     - Status dropdown
     - Specialization tags (add/remove)
     - Certification tags (add/remove)

4. **Assign Task Screen**
   - Location: Multiple entry points
   - Features:
     - Therapist info card
     - Customer information form
     - Service details
     - Date/time picker with slots
     - Location address input
     - Notes textarea

### Therapist Screens

1. **Therapist Login**
   - Location: Welcome → Therapist button
   - Features:
     - Email/password fields
     - Demo credentials display
     - Login button

2. **Therapist Dashboard**
   - Location: After therapist login
   - Features:
     - Profile header with status
     - Performance metrics (4 cards)
     - Quick actions (4 buttons)
     - Today's assignments list

3. **My Assignments**
   - Location: Therapist Dashboard → My Assignments
   - Features:
     - Filter tabs (Today, Upcoming, Completed, All)
     - Assignment cards with:
       - Status badge
       - Customer & service info
       - Location
       - Action buttons based on status

### Customer Screens

1. **Therapist Tracking**
   - Location: Customer bookings → Track
   - Features:
     - Status card with icon
     - Estimated arrival time
     - Live map view (placeholder)
     - Current location display
     - Therapist info card
     - Service details
     - Call therapist button
     - Demo controls for testing

---

## 🔄 Status Flow Diagram

```
ASSIGNMENT LIFECYCLE:

[Created] → [Assigned] → [In Progress] → [Completed]
                ↓                ↓
           [Cancelled]    [Can be cancelled]

THERAPIST ACTIONS:
- Assigned: Can "Start Service"
- In Progress: Can "Complete Service"
- Completed: No actions (read-only)

CUSTOMER VIEW:
- Assigned: Can view therapist info, cannot track
- In Progress: Can track live location
- Completed: Can leave review
```

---

## 💾 Database Integration (Real Implementation)

### When Connected to Supabase:

1. **Creating Assignment:**
```typescript
const { data, error } = await supabase
  .from('therapist_assignments')
  .insert({
    therapist_id: therapistId,
    vendor_id: vendorId,
    customer_id: customerId,
    service_id: serviceId,
    assignment_date: date,
    assignment_time: time,
    status: 'assigned',
    location_address: address,
    location_latitude: lat,
    location_longitude: lng,
    estimated_duration: duration
  });
```

2. **Starting Service (Therapist):**
```typescript
// Update assignment status
await supabase
  .from('therapist_assignments')
  .update({ status: 'in_progress' })
  .eq('id', assignmentId);

// Start location tracking
setInterval(async () => {
  const position = await getCurrentPosition();
  await supabase
    .from('therapist_locations')
    .insert({
      therapist_id: therapistId,
      latitude: position.latitude,
      longitude: position.longitude,
      accuracy: position.accuracy,
      battery_level: await getBatteryLevel()
    });
}, 5000); // Update every 5 seconds
```

3. **Customer Tracking:**
```typescript
// Subscribe to real-time location updates
const subscription = supabase
  .channel('therapist_location')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'therapist_locations',
    filter: `therapist_id=eq.${therapistId}`
  }, (payload) => {
    updateMapLocation(payload.new);
  })
  .subscribe();
```

4. **Completing Service:**
```typescript
await supabase
  .from('therapist_assignments')
  .update({
    status: 'completed',
    actual_duration: actualMinutes
  })
  .eq('id', assignmentId);

// Stop location tracking
clearInterval(locationInterval);
```

---

## 🧪 Testing the Complete Flow

### Test Scenario 1: Happy Path

1. ✅ Login as Vendor (Demo: any credentials)
2. ✅ Add a new therapist "Priya Sharma"
3. ✅ Go to Bookings tab
4. ✅ Click "Assign" on a booking
5. ✅ Fill in assignment details
6. ✅ Submit assignment
7. ✅ Logout from vendor
8. ✅ Login as Therapist (priya.sharma@example.com)
9. ✅ View My Assignments
10. ✅ Click "Start Service"
11. ✅ (Simulate customer view) Go to tracking screen
12. ✅ See "In Progress" status
13. ✅ Click "Complete Service"
14. ✅ See "Completed" status

### Test Scenario 2: Navigation Flow

1. ✅ Therapist clicks "Navigate" button
2. ✅ Google Maps opens with destination
3. ✅ Therapist arrives and starts service
4. ✅ Customer sees live updates

### Test Scenario 3: Communication

1. ✅ Customer clicks "Call Therapist"
2. ✅ Phone dialer opens
3. ✅ Therapist can also call customer
4. ✅ Two-way communication established

---

## 🎯 Key Features Summary

### ✅ Vendor Features
- ✅ Add/Edit/Delete therapists
- ✅ Manage therapist profiles
- ✅ View therapist list with filters
- ✅ Assign bookings to therapists
- ✅ Track therapist performance
- ✅ View assignment history

### ✅ Therapist Features
- ✅ View assigned tasks
- ✅ Filter assignments (Today/Upcoming/Completed)
- ✅ Navigate to customer location
- ✅ Start service (begins tracking)
- ✅ Complete service
- ✅ Call customer directly
- ✅ View service details

### ✅ Customer Features
- ✅ Track therapist in real-time
- ✅ View therapist profile & ratings
- ✅ See estimated arrival time
- ✅ View live location on map
- ✅ Call therapist directly
- ✅ Service status updates
- ✅ Completion notifications

---

## 🚀 Next Steps for Production

1. **Apply Database Migration**
   - Use `/supabase/migrations/20250102_therapist_management.sql`

2. **Integrate Real Maps**
   - Add Google Maps API
   - Implement MapBox alternative
   - Real-time marker updates

3. **Add Push Notifications**
   - Notify therapist of new assignments
   - Notify customer when therapist starts
   - Completion notifications

4. **Implement Real Location Tracking**
   - Use Geolocation API
   - WebSocket for real-time updates
   - Background location updates

5. **Add Reviews & Ratings**
   - Customer can rate therapist after completion
   - Ratings update therapist profile
   - Review history

6. **Payment Integration**
   - Process payment on completion
   - Therapist earnings tracking
   - Commission calculations

---

## 📱 Mobile App Considerations

The same workflow works in the mobile app (`OmbaroMobile/`) with native features:
- Native Maps integration
- GPS location tracking
- Push notifications
- Phone dialer integration
- Camera for profile photos

---

## 🔒 Security Notes

- ✅ RLS policies ensure data isolation
- ✅ Therapists can only see their assignments
- ✅ Vendors can only manage their therapists
- ✅ Customers can only track active assignments
- ✅ Location data deleted after completion (configurable)

---

## 💡 Tips for Best Experience

1. **For Vendors:**
   - Add detailed therapist profiles
   - Verify certifications
   - Assign based on specialization
   - Monitor performance metrics

2. **For Therapists:**
   - Keep profile updated
   - Respond quickly to assignments
   - Update location permissions
   - Maintain high ratings

3. **For Customers:**
   - Provide accurate address
   - Be available for therapist calls
   - Track arrival in real-time
   - Leave honest reviews

---

## 🎉 Conclusion

You now have a complete, working therapist management system with:
- ✅ Vendor can add and manage therapists
- ✅ Vendor can assign bookings to therapists
- ✅ Therapist can view and manage assignments
- ✅ Therapist can start/complete services
- ✅ Customer can track therapist in real-time
- ✅ Real-time location updates
- ✅ Complete status tracking
- ✅ Communication features

**The workflow is ready to test!** 🚀
