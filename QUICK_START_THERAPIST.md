# Quick Start: Therapist Login

## 🚀 How to Login as Therapist

### Step 1: Open the App
Navigate to the OMBARO application in your browser.

### Step 2: Find the Therapist Button
On the **Welcome Screen**, scroll down to find the portal access buttons at the bottom.

You'll see a **3x2 grid** of buttons:
```
┌─────────────┬─────────────┬─────────────┐
│  Employee   │   Vendor    │  Therapist  │  ← Click Here!
├─────────────┼─────────────┼─────────────┤
│    Admin    │ Departments │     Doc     │
└─────────────┴─────────────┴─────────────┘
```

### Step 3: Click "Therapist"
Click on the **Therapist** button in the top-right of the grid.

### Step 4: Enter Credentials
Use these demo credentials:

📧 **Email:** `priya.sharma@example.com`
🔒 **Password:** `therapist123`

### Step 5: Login
Click the **"Login as Therapist"** button.

### ✅ Success!
You'll now see the **Therapist Dashboard** with:
- Your profile and ratings
- Today's assignments
- Performance metrics
- Quick action buttons

---

## 📱 What You'll See

### Therapist Dashboard Features:

**Profile Section:**
- Name: Priya Sharma
- Specializations: Swedish Massage, Deep Tissue, Aromatherapy
- Rating: 4.8 ⭐ (156 reviews)
- Status: Available

**Performance Metrics:**
- 📅 Today's Tasks: 0
- ✅ Completion Rate: 93.3%
- ⭐ Average Rating: 4.7
- 💰 Total Earnings: ₹125k

**Quick Actions:**
- View My Assignments
- Manage Schedule
- Update Location
- Request Leave

---

## ⚠️ Important Notes

1. **Therapist Accounts are Created by Vendors**
   - Therapists cannot self-register
   - Your vendor must add you to the system first
   - You'll receive login credentials from your vendor

2. **Demo Mode**
   - Currently using mock authentication
   - Any email/password will work for testing
   - Real Supabase integration coming soon

3. **Database Setup Required**
   - For production use, apply the migration:
   - File: `/supabase/migrations/20250102_therapist_management.sql`

---

## 🔧 For Vendors: How to Add Therapists

1. Login to your Vendor Dashboard
2. Navigate to **"Therapist Management"**
3. Click **"Add Therapist"** button
4. Fill in therapist details:
   - Name, Email, Mobile
   - Specializations
   - Certifications
   - Experience
5. Save the therapist profile
6. Share the email and password with the therapist

---

## 🆘 Troubleshooting

**Can't find the Therapist button?**
- Make sure you're on the Welcome Screen
- Look at the bottom of the screen for portal buttons
- It's in a 3-column grid layout

**Login not working?**
- In demo mode, any credentials work
- Check browser console (F12) for errors
- Ensure you clicked "Login as Therapist" button

**Dashboard not loading?**
- Clear browser cache
- Refresh the page
- Check browser console for errors

---

## 📚 Additional Resources

- **Full Implementation Guide:** `THERAPIST_SYSTEM_IMPLEMENTATION.md`
- **Detailed Login Guide:** `THERAPIST_LOGIN_GUIDE.md`
- **Database Schema:** `/supabase/migrations/20250102_therapist_management.sql`

---

## 🎯 Next Steps After Login

1. ✅ Explore the dashboard
2. ✅ Check your performance metrics
3. ✅ Review quick action options
4. ✅ Familiarize yourself with the interface
5. ⏳ Wait for vendor to assign tasks

---

**Built with OMBARO** 🌸
*Beauty & Wellness Platform*
