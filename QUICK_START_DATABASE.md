# 🚀 Quick Start: Supabase Database Connection

## Your Credentials
```
Project ID: vspkiuissuuesjsnnpqr
Supabase URL: https://vspkiuissuuesjsnnpqr.supabase.co
Public (Anon) Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...pcl5Z0DDpFj8Qu6J4KQZINUQTrJhIMalRTRlLyqIfRk
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...q9jR-K1bA2_Du6cdMI3F8F1WVcLH2cfKs3l1YF3UycA
```

## 3 Simple Steps to Connect

### 1️⃣ Get Database Password
Go to: https://supabase.com/dashboard/project/vspkiuissuuesjsnnpqr/settings/database
- Look for "Connection string"
- Click "Show" to reveal password
- Copy it

### 2️⃣ Update Backend Config
Open: `backend/.env`
Replace `[YOUR-DB-PASSWORD]` with your password

### 3️⃣ Run Migrations
1. Go to: https://supabase.com/dashboard/project/vspkiuissuuesjsnnpqr/sql
2. Copy contents of: `supabase/migrations/20250115_clean_production_schema.sql`
3. Paste in SQL Editor
4. Click "Run"
5. Wait for "Success"

## ✅ Verify Setup

**Check Tables Created**:
```sql
SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';
```
Expected: ~60 tables

**Check RLS Enabled**:
```sql
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true;
```

## 🚀 Start Development

**Frontend**:
```bash
npm run dev
```
Opens: http://localhost:5173

**Backend**:
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```
Opens: http://localhost:8000

**Test Backend Health**:
Visit: http://localhost:8000/health

Expected:
```json
{"status": "healthy", "database": "connected"}
```

## 📦 What's Included

✅ **Frontend**:
- Supabase client configured
- Real authentication (OTP + Password)
- Service layers: vendor, therapist, booking, department

✅ **Backend**:
- PostgreSQL connection to Supabase
- Supabase Python client
- Auth endpoints integrated

✅ **Database**:
- 60 production tables
- Row Level Security
- Real-time capabilities
- Complete audit trail

## 🎯 Quick Examples

### Frontend: Get Bookings
```typescript
import { bookingService } from './services/booking.service';

const bookings = await bookingService.getCustomerBookings(customerId);
```

### Frontend: Track Therapist Location
```typescript
import { therapistService } from './services/therapist.service';

const unsubscribe = await therapistService.subscribeToLocationUpdates(
  therapistId,
  (location) => {
    console.log('Therapist at:', location.latitude, location.longitude);
  }
);
```

### Frontend: Authenticate User
```typescript
const { sendOTP, verifyOTP } = useAuth();

await sendOTP('+919876543210');
await verifyOTP('123456');
```

### Backend: Query Database
```python
from app.core.supabase_client import get_supabase_admin

supabase = get_supabase_admin()
vendors = supabase.table('vendors').select('*').eq('status', 'active').execute()
```

## 📚 Documentation Files

- `SUPABASE_CONNECTION_COMPLETE.md` - Complete setup details
- `DATABASE_CONNECTION_GUIDE.md` - Step-by-step guide
- `DATABASE_SCHEMA.md` - Database structure documentation
- `DATABASE_SCHEMA_DOCUMENTATION.md` - Detailed schema docs

## 🐛 Common Issues

**Error: "password authentication failed"**
→ Double-check password in `backend/.env`

**Error: "relation does not exist"**
→ Run migrations (Step 3)

**Error: "RLS policy violation"**
→ Normal! User must be authenticated first

**Frontend blank page**
→ Check browser console, verify `.env` loaded

## 🎉 You're Ready!

Database is connected and ready for development. Start building:
- Booking system
- Vendor onboarding
- Therapist tracking
- Payment processing
- Admin dashboards

Happy coding! 🚀
