# OMBARO Platform - Technical Implementation Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Frontend Development](#frontend-development)
4. [Backend Development](#backend-development)
5. [Database Implementation](#database-implementation)
6. [Real-Time Features](#real-time-features)
7. [API Integration](#api-integration)
8. [Caching Strategy](#caching-strategy)
9. [Testing Strategy](#testing-strategy)
10. [Deployment Guide](#deployment-guide)

---

## Quick Start

### Prerequisites
```bash
# Required software
Node.js >= 18.0.0
npm >= 9.0.0
Git
Supabase CLI (optional for local development)
Redis (for caching layer)
```

### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd ombaro

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Configure .env with your Supabase credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────┬───────────────────────────────────────┤
│   React Web (Vite)      │   React Native Mobile (Expo)          │
│   - TypeScript          │   - TypeScript                         │
│   - Tailwind CSS        │   - Native Base                        │
│   - Context API         │   - Context API                        │
└───────────┬─────────────┴─────────────────┬─────────────────────┘
            │                               │
            └───────────────┬───────────────┘
                            ↓
            ┌───────────────────────────────────────┐
            │         SUPABASE LAYER                │
            ├───────────────────────────────────────┤
            │  • PostgreSQL (Row Level Security)    │
            │  • Edge Functions (Deno Runtime)      │
            │  • Realtime (WebSocket)               │
            │  • Auth (JWT-based)                   │
            │  • Storage (Files)                    │
            └───────────┬───────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ↓                               ↓
┌──────────────┐              ┌──────────────────┐
│ Redis Cache  │              │ FastAPI Services │
│ • Sessions   │              │ • Business Logic │
│ • Query      │              │ • 3rd Party APIs │
│ • Location   │              │ • Analytics      │
└──────────────┘              └──────────────────┘
```

### Technology Stack

#### Frontend (Web)
- **Framework**: React 18.3+
- **Build Tool**: Vite 5.4+
- **Language**: TypeScript 5.5+
- **Styling**: Tailwind CSS 3.4+
- **State Management**: React Context API + Hooks
- **Real-Time**: Supabase JavaScript Client
- **Icons**: Lucide React

#### Frontend (Mobile)
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Library**: Native Base / React Native Paper
- **Navigation**: React Navigation
- **State Management**: React Context API

#### Backend
- **Database**: PostgreSQL 15+ (Supabase)
- **API**: Supabase Edge Functions (Deno)
- **Additional APIs**: FastAPI (Python)
- **Caching**: Redis 7+
- **Real-Time**: Supabase Realtime (Elixir Phoenix)

#### Security
- **Auth**: Supabase Auth (JWT)
- **Authorization**: Row Level Security (RLS)
- **Encryption**: TLS 1.3, AES-256

---

## Frontend Development

### Project Structure

```
src/
├── components/
│   ├── auth/              # Authentication screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── MobileInputScreen.tsx
│   │   ├── OTPScreen.tsx
│   │   ├── RoleSelectionScreen.tsx
│   │   └── ...
│   ├── admin/             # Admin portal
│   ├── vendor/            # Vendor portal
│   ├── therapist/         # Therapist portal
│   ├── employee/          # Employee portal
│   ├── screens/           # Customer screens
│   ├── common/            # Shared components
│   ├── ui/                # UI primitives
│   └── dashboard/         # Dashboard layouts
├── hooks/
│   ├── useAuth.ts         # Authentication hook
│   └── ...
├── types/
│   ├── auth.ts            # Auth types
│   ├── booking.ts         # Booking types
│   ├── therapist.ts       # Therapist types
│   ├── roles.ts           # Role definitions
│   └── ...
├── App.tsx                # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

### State Management

#### Authentication Context
```typescript
// src/hooks/useAuth.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
```

### Component Patterns

#### Screen Component Template
```typescript
interface MyScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function MyScreen({ onNavigate }: MyScreenProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('table_name')
        .select('*');

      if (error) throw error;
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Component content */}
    </div>
  );
}
```

### Routing Pattern

```typescript
// App.tsx
function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedEntity, setSelectedEntity] = useState(null);

  function handleNavigate(screen: string, data?: any) {
    setCurrentScreen(screen);
    if (data) setSelectedEntity(data);
  }

  // Screen rendering
  switch (currentScreen) {
    case 'home':
      return <HomeScreen onNavigate={handleNavigate} />;
    case 'booking':
      return <BookingScreen onNavigate={handleNavigate} />;
    // ... more cases
    default:
      return <WelcomeScreen onNavigate={handleNavigate} />;
  }
}
```

---

## Backend Development

### Supabase Edge Functions

#### Function Structure
```
supabase/
└── functions/
    ├── booking-service/
    │   └── index.ts
    ├── location-service/
    │   └── index.ts
    ├── payment-service/
    │   └── index.ts
    └── notification-service/
        └── index.ts
```

#### Example Edge Function
```typescript
// supabase/functions/booking-service/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get user from JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Handle different routes
    const url = new URL(req.url);
    const path = url.pathname;

    if (path === "/create-booking" && req.method === "POST") {
      const booking = await req.json();

      // Validate booking data
      if (!booking.service_id || !booking.vendor_id) {
        throw new Error("Missing required fields");
      }

      // Create booking
      const { data, error } = await supabaseClient
        .from("bookings")
        .insert({
          customer_id: user.id,
          vendor_id: booking.vendor_id,
          booking_date: booking.date,
          booking_time: booking.time,
          service_location: booking.location,
          status: "pending"
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger notification
      await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/notification-service`, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "booking_created",
          booking_id: data.id
        })
      });

      return new Response(
        JSON.stringify({ success: true, booking: data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Route not found" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

#### Deploying Edge Functions
```bash
# Using Supabase CLI (if available)
supabase functions deploy booking-service

# Or use the MCP tools in development
# Functions are automatically deployed when you save changes
```

### FastAPI Services

#### FastAPI Structure
```python
# fastapi/main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import redis
from supabase import create_client, Client

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis connection
redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
)

@app.post("/api/analytics/track")
async def track_event(event: dict):
    """Track analytics event with caching"""
    try:
        # Cache recent events
        cache_key = f"event:{event['user_id']}:{event['event_name']}"
        redis_client.setex(cache_key, 3600, json.dumps(event))

        # Store in database
        result = supabase.table('analytics_events').insert(event).execute()

        return {"success": True, "event_id": result.data[0]['id']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/dashboard/stats")
async def get_dashboard_stats(user_id: str):
    """Get cached dashboard statistics"""
    cache_key = f"dashboard:stats:{user_id}"

    # Try cache first
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)

    # Query database
    stats = supabase.rpc('get_dashboard_stats', {'p_user_id': user_id}).execute()

    # Cache for 5 minutes
    redis_client.setex(cache_key, 300, json.dumps(stats.data))

    return stats.data
```

---

## Database Implementation

### Setup Database Schema

1. **Apply Main Migration**
```bash
# Copy migration file to your Supabase project
# File: supabase/migrations/20250102_complete_ombaro_schema.sql

# Apply using Supabase dashboard:
# 1. Go to SQL Editor
# 2. Paste the migration SQL
# 3. Run the script
```

2. **Verify Tables**
```sql
-- Check all tables created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check RLS policies
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

### Working with Row Level Security

#### Testing RLS Policies
```sql
-- Test as customer
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "customer-user-id", "role": "authenticated"}';

-- Try to access bookings
SELECT * FROM bookings;  -- Should only see own bookings

-- Reset
RESET role;
```

#### Common RLS Patterns

**User owns resource**
```sql
CREATE POLICY "Users view own data"
  ON table_name FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
```

**Role-based access**
```sql
CREATE POLICY "Admins view all"
  ON table_name FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );
```

**Hierarchical access**
```sql
CREATE POLICY "Managers view team data"
  ON employees FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR
    reporting_manager = auth.uid() OR
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'hr_department'
    )
  );
```

### Database Queries

#### Supabase Client Queries

**Simple query**
```typescript
const { data, error } = await supabase
  .from('services')
  .select('*')
  .eq('is_active', true)
  .order('name');
```

**Query with joins**
```typescript
const { data, error } = await supabase
  .from('bookings')
  .select(`
    *,
    customer:customers(name, email),
    vendor:vendors(business_name),
    items:booking_items(
      *,
      service:services(name, duration_options, base_price_60min)
    )
  `)
  .eq('customer_id', userId)
  .order('created_at', { ascending: false });
```

**Insert with return**
```typescript
const { data, error } = await supabase
  .from('bookings')
  .insert({
    customer_id: userId,
    vendor_id: vendorId,
    booking_date: date,
    booking_time: time,
    status: 'pending'
  })
  .select()
  .single();
```

**Update**
```typescript
const { data, error } = await supabase
  .from('therapist_assignments')
  .update({ status: 'in_progress', actual_start_time: new Date() })
  .eq('id', assignmentId)
  .select()
  .single();
```

**Delete**
```typescript
const { error } = await supabase
  .from('therapists')
  .delete()
  .eq('id', therapistId);
```

**RPC (stored procedure)**
```typescript
const { data, error } = await supabase
  .rpc('get_nearby_vendors', {
    p_latitude: 12.9716,
    p_longitude: 77.5946,
    p_radius_km: 10
  });
```

---

## Real-Time Features

### Setting Up Subscriptions

#### Location Tracking
```typescript
// Subscribe to therapist location updates
const locationSubscription = supabase
  .channel('therapist-location')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'therapist_locations',
      filter: `therapist_id=eq.${therapistId}`
    },
    (payload) => {
      console.log('Location update:', payload.new);
      updateMapMarker(payload.new.latitude, payload.new.longitude);
    }
  )
  .subscribe();

// Cleanup
return () => {
  supabase.removeChannel(locationSubscription);
};
```

#### Booking Status Updates
```typescript
const bookingSubscription = supabase
  .channel('booking-updates')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'bookings',
      filter: `customer_id=eq.${customerId}`
    },
    (payload) => {
      console.log('Booking updated:', payload.new);
      showNotification(`Booking ${payload.new.status}`);
      refreshBookings();
    }
  )
  .subscribe();
```

#### Assignment Status for Therapists
```typescript
const assignmentSubscription = supabase
  .channel('my-assignments')
  .on(
    'postgres_changes',
    {
      event: '*',  // All events
      schema: 'public',
      table: 'therapist_assignments',
      filter: `therapist_id=eq.${therapistId}`
    },
    (payload) => {
      if (payload.eventType === 'INSERT') {
        showNotification('New assignment received!');
      } else if (payload.eventType === 'UPDATE') {
        updateAssignmentList();
      }
    }
  )
  .subscribe();
```

### Presence (Online/Offline Status)

```typescript
// Track therapist online status
const presenceChannel = supabase.channel('therapist-presence');

presenceChannel
  .on('presence', { event: 'sync' }, () => {
    const state = presenceChannel.presenceState();
    console.log('Online therapists:', state);
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    console.log('Therapist joined:', key, newPresences);
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    console.log('Therapist left:', key, leftPresences);
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      // Track own presence
      await presenceChannel.track({
        therapist_id: therapistId,
        online_at: new Date().toISOString()
      });
    }
  });
```

---

## API Integration

### Payment Gateway Integration

#### Razorpay Example
```typescript
// Initialize Razorpay
const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: totalAmount * 100, // Convert to paise
  currency: 'INR',
  name: 'OMBARO',
  description: 'Spa Service Payment',
  order_id: orderId, // Generated from backend
  handler: async function(response: any) {
    // Verify payment on backend
    const { data, error } = await supabase.functions.invoke('payment-service', {
      body: {
        action: 'verify_payment',
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        booking_id: bookingId
      }
    });

    if (!error && data.verified) {
      showSuccess('Payment successful!');
      onNavigate('orderTracking', { bookingId });
    }
  },
  prefill: {
    name: user.name,
    email: user.email,
    contact: user.mobile
  },
  theme: {
    color: '#F59E0B'
  }
};

const razorpay = new window.Razorpay(options);
razorpay.open();
```

### SMS/Email Notifications

#### Twilio SMS
```typescript
// Edge function: notification-service
async function sendSMS(to: string, message: string) {
  const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const from = Deno.env.get("TWILIO_PHONE_NUMBER");

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(accountSid + ":" + authToken)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        To: to,
        From: from,
        Body: message
      })
    }
  );

  return await response.json();
}
```

#### SendGrid Email
```typescript
async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = Deno.env.get("SENDGRID_API_KEY");

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: "noreply@ombaro.com", name: "OMBARO" },
      subject: subject,
      content: [{ type: "text/html", value: html }]
    })
  });

  return await response.json();
}
```

---

## Caching Strategy

### Redis Implementation

#### Session Caching
```typescript
// Store user session
async function cacheUserSession(userId: string, sessionData: any) {
  const key = `user:session:${userId}`;
  await redis.setex(key, 86400, JSON.stringify(sessionData)); // 24 hours
}

// Retrieve session
async function getUserSession(userId: string) {
  const key = `user:session:${userId}`;
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
}
```

#### Query Result Caching
```typescript
async function getCachedOrQuery(
  cacheKey: string,
  queryFn: () => Promise<any>,
  ttl: number = 300
) {
  // Try cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Query database
  const result = await queryFn();

  // Cache result
  await redis.setex(cacheKey, ttl, JSON.stringify(result));

  return result;
}

// Usage
const services = await getCachedOrQuery(
  'services:active',
  async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true);
    return data;
  },
  3600 // 1 hour
);
```

#### Location Caching
```typescript
// Cache therapist location
async function cacheTherapistLocation(therapistId: string, location: any) {
  const key = `therapist:location:${therapistId}`;
  await redis.setex(key, 300, JSON.stringify(location)); // 5 minutes
}

// Get cached location
async function getTherapistLocation(therapistId: string) {
  const key = `therapist:location:${therapistId}`;
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
}
```

#### Cache Invalidation
```typescript
// Invalidate on update
async function updateBookingStatus(bookingId: string, status: string) {
  // Update database
  await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId);

  // Invalidate related caches
  const booking = await supabase
    .from('bookings')
    .select('customer_id, vendor_id')
    .eq('id', bookingId)
    .single();

  await redis.del(`booking:${bookingId}`);
  await redis.del(`user:bookings:${booking.data.customer_id}`);
  await redis.del(`vendor:bookings:${booking.data.vendor_id}`);
}
```

---

## Testing Strategy

### Unit Testing

```typescript
// Example test with Vitest
import { describe, it, expect, beforeEach } from 'vitest';
import { calculateBookingTotal } from './booking-utils';

describe('Booking Calculations', () => {
  it('should calculate total with tax', () => {
    const items = [
      { price: 1000, quantity: 1 },
      { price: 500, quantity: 2 }
    ];

    const total = calculateBookingTotal(items, 0.18); // 18% tax
    expect(total).toBe(2360); // (1000 + 1000) * 1.18
  });

  it('should apply discount correctly', () => {
    const items = [{ price: 1000, quantity: 1 }];
    const total = calculateBookingTotal(items, 0.18, 100); // ₹100 discount

    expect(total).toBe(1062); // (1000 - 100) * 1.18
  });
});
```

### Integration Testing

```typescript
// Test database operations
import { createClient } from '@supabase/supabase-js';

describe('Booking Flow', () => {
  let supabase;
  let testUserId;

  beforeEach(async () => {
    supabase = createClient(TEST_URL, TEST_KEY);

    // Create test user
    const { data } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'testpass123'
    });
    testUserId = data.user.id;
  });

  it('should create booking and send notification', async () => {
    // Create booking
    const { data: booking } = await supabase
      .from('bookings')
      .insert({
        customer_id: testUserId,
        vendor_id: 'test-vendor',
        booking_date: '2025-01-15',
        booking_time: '14:00'
      })
      .select()
      .single();

    expect(booking.id).toBeDefined();
    expect(booking.status).toBe('pending');

    // Verify notification created
    const { data: notifications } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', testUserId)
      .eq('type', 'booking_confirmed');

    expect(notifications.length).toBeGreaterThan(0);
  });
});
```

### End-to-End Testing

```typescript
// Using Playwright
import { test, expect } from '@playwright/test';

test('complete booking flow', async ({ page }) => {
  // Navigate to app
  await page.goto('http://localhost:5173');

  // Login
  await page.fill('input[name="mobile"]', '9876543210');
  await page.click('button:has-text("Continue")');

  // Enter OTP (in test environment, use test OTP)
  await page.fill('input[name="otp"]', '123456');
  await page.click('button:has-text("Verify")');

  // Select service
  await page.click('text=Swedish Massage');
  await page.click('text=60 minutes');
  await page.click('button:has-text("Book Now")');

  // Fill booking details
  await page.fill('input[name="date"]', '2025-01-15');
  await page.selectOption('select[name="time"]', '14:00');
  await page.fill('textarea[name="address"]', '123 Test Street');

  // Proceed to payment
  await page.click('button:has-text("Proceed to Payment")');

  // Verify booking summary
  await expect(page.locator('text=Swedish Massage')).toBeVisible();
  await expect(page.locator('text=₹2,200')).toBeVisible();
});
```

---

## Deployment Guide

### Frontend Deployment (Netlify)

```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_RAZORPAY_KEY_ID=your_key
```

### _redirects Configuration
```
# Handle client-side routing
/*    /index.html   200

# API proxy (optional)
/api/*  https://your-backend.com/:splat  200
```

### Database Deployment

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project
   - Note the URL and anon key

2. **Apply Migrations**
   - Go to SQL Editor in Supabase dashboard
   - Run migration files in order:
     1. `20250102_complete_ombaro_schema.sql`
     2. Any additional migrations

3. **Configure Auth**
   - Enable Email provider
   - Configure email templates
   - Set up redirect URLs

4. **Setup Storage**
   - Create buckets for:
     - profile-images
     - documents
     - service-images

### Edge Functions Deployment

```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy booking-service

# Set environment variables
supabase secrets set TWILIO_ACCOUNT_SID=xxx
supabase secrets set SENDGRID_API_KEY=xxx
```

### FastAPI Deployment (Railway/Render)

```yaml
# railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Redis Deployment (Upstash)

1. Create Upstash Redis database
2. Get connection URL
3. Add to environment variables
4. Update connection string in code

### Monitoring & Logging

#### Supabase Logs
```sql
-- Query slow queries
SELECT * FROM pg_stat_statements
WHERE mean_exec_time > 1000
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Check connection pool
SELECT count(*) FROM pg_stat_activity;
```

#### Application Logging
```typescript
// Use structured logging
const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  },
  error: (message: string, error?: any, meta?: any) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  }
};
```

---

## Performance Optimization

### Database Optimization

1. **Indexing Strategy**
   - All foreign keys indexed
   - Composite indexes for common queries
   - Full-text search indexes
   - Geographic indexes for location queries

2. **Query Optimization**
```sql
-- Use materialized views for complex aggregations
CREATE MATERIALIZED VIEW vendor_stats AS
SELECT
  v.id,
  v.business_name,
  COUNT(b.id) as total_bookings,
  AVG(r.overall_rating) as avg_rating,
  SUM(p.total_amount) as total_revenue
FROM vendors v
LEFT JOIN bookings b ON v.id = b.vendor_id
LEFT JOIN reviews r ON v.id = r.vendor_id
LEFT JOIN payments p ON b.id = p.booking_id
WHERE b.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY v.id, v.business_name;

-- Refresh every 5 minutes
REFRESH MATERIALIZED VIEW CONCURRENTLY vendor_stats;
```

3. **Connection Pooling**
   - Use Supabase's built-in pooling
   - Configure max connections based on tier
   - Use read replicas for reporting

### Frontend Optimization

1. **Code Splitting**
```typescript
// Lazy load screens
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboardScreen'));
const VendorDashboard = lazy(() => import('./components/vendor/VendorDashboardScreen'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <AdminDashboard />
</Suspense>
```

2. **Image Optimization**
   - Use WebP format
   - Lazy load images
   - Implement responsive images
   - CDN for static assets

3. **Caching Strategy**
   - Service Worker for offline capability
   - Local Storage for user preferences
   - IndexedDB for large datasets

---

## Security Best Practices

### Authentication Security

1. **Password Requirements**
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers
   - Special characters recommended

2. **Session Management**
   - JWT tokens with short expiry
   - Refresh tokens for extended sessions
   - Logout on all devices option

3. **Rate Limiting**
```typescript
// Implement rate limiting in edge functions
const rateLimitKey = `rate_limit:${userId}:${endpoint}`;
const requestCount = await redis.incr(rateLimitKey);

if (requestCount === 1) {
  await redis.expire(rateLimitKey, 60); // 1 minute window
}

if (requestCount > 10) {
  throw new Error('Rate limit exceeded');
}
```

### Data Security

1. **Encryption**
   - TLS for all communications
   - Encrypt sensitive data (bank details)
   - Hash passwords with bcrypt

2. **Input Validation**
```typescript
// Validate all user inputs
function validateBookingInput(data: any) {
  if (!data.booking_date || !isValidDate(data.booking_date)) {
    throw new Error('Invalid booking date');
  }

  if (!data.vendor_id || !isUUID(data.vendor_id)) {
    throw new Error('Invalid vendor ID');
  }

  // Sanitize inputs
  data.special_instructions = sanitizeHtml(data.special_instructions);

  return data;
}
```

3. **SQL Injection Prevention**
   - Use parameterized queries
   - Never concatenate user input in SQL
   - Supabase client handles this automatically

---

## Troubleshooting

### Common Issues

#### RLS Policies Not Working
```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'bookings';

-- Test as specific user
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "user-id"}';
SELECT * FROM bookings;
```

#### Slow Queries
```sql
-- Enable query logging
ALTER DATABASE postgres SET log_statement = 'all';

-- Check slow queries
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
WHERE mean_exec_time > 1000
ORDER BY mean_exec_time DESC;

-- Analyze query
EXPLAIN ANALYZE
SELECT * FROM bookings WHERE customer_id = 'xxx';
```

#### Real-Time Not Working
```typescript
// Check connection status
const channel = supabase.channel('test');
channel.subscribe((status) => {
  console.log('Subscription status:', status);
});

// Check table permissions
// Ensure RLS allows SELECT on table
// Check if changes are published (not in transaction)
```

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## Support & Contribution

For issues and feature requests, please contact the development team or create an issue in the repository.

---

**Last Updated**: January 2, 2025
**Version**: 1.0.0
