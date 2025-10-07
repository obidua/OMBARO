# OMBARO - Beauty & Wellness Platform

> **Complete project overview in [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)**
> **Database schema in [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)**
> **Migration guide in [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)**

A comprehensive beauty and wellness platform with web, mobile, and optional backend applications, featuring multi-portal authentication for customers, vendors, therapists, beauticians, employees, and administrators.

---

## Quick Links

- [Quick Start Guide](./QUICK_START.md)
- [Technical Implementation](./TECHNICAL_IMPLEMENTATION_GUIDE.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Vendor Onboarding](./VENDOR_ONBOARDING_GUIDE.md)
- [Therapist Guide](./THERAPIST_LOGIN_GUIDE.md)

---

## Database

- **Tables**: 60+ essential tables (production-ready schema)
- **Technology**: PostgreSQL 15+ via Supabase
- **Base Migration**: `supabase/migrations/20250115_clean_production_schema.sql`
- **Total Migrations**: 9 migration files
- **Row Level Security**: Enabled on all user-facing tables
- **Real-Time**: WebSocket support for live updates
- **Documentation**: See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) and [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)

---

## Project Structure

This repository contains three main applications:

### 1. Web Application (Current Directory)
- **Framework**: React 18.3+ with TypeScript 5.5+
- **Build Tool**: Vite 5.4+
- **Styling**: Tailwind CSS 3.4+
- **Database**: Supabase (PostgreSQL + Real-time + Auth)
- **Features**: Responsive web interface, PWA capabilities, real-time updates
- **Target**: Desktop and mobile browsers

### 2. Mobile Application (`/OMBAROMobile`)
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: React Native StyleSheet
- **Database**: Supabase (shared with web)
- **Features**: Native mobile experience for iOS and Android
- **Target**: iOS and Android app stores

### 3. Backend API (`/backend`) - Optional
- **Framework**: FastAPI (Python 3.11+)
- **Purpose**: Complex business logic and third-party integrations
- **Database**: Supabase Python SDK
- **Caching**: Redis 7+
- **Note**: Most API needs are handled directly by Supabase
- **Documentation**: Auto-generated OpenAPI (Swagger/ReDoc)

---

## Features

### Customer Portal
- **Service Discovery**: Browse and search spa/wellness services with filters and categories
- **Smart Booking**: Schedule appointments with real-time therapist availability checking
- **Payment Integration**: Secure payment processing (cards, UPI, wallets, pay later)
- **Live Tracking**: Real-time GPS tracking of assigned therapists during service
- **Review & Rating**: Rate and review services, therapists, and vendors
- **Loyalty Program**: Earn and redeem loyalty points on every booking
- **Referral Rewards**: Invite friends and earn rewards
- **Multiple Addresses**: Save and manage multiple service locations
- **Booking History**: Complete history with reorder and reschedule options
- **Wallet**: Manage wallet balance, view transaction history

### Vendor Portal
- **Business Profile**: Complete spa/salon profile with photos, description, operating hours
- **Service Management**: Create custom services, set pricing, manage availability
- **Booking Management**: Real-time booking dashboard, accept/reject bookings
- **Therapist Management**: Add therapists, manage schedules, assign to bookings
- **Staff Management**: Manage receptionists, managers, and administrative staff
- **Task Assignment**: Assign services to therapists with real-time tracking
- **Financial Dashboard**: Track revenue, commissions, pending payouts
- **Analytics**: Performance metrics, booking trends, customer insights
- **Review Management**: Monitor and respond to customer feedback
- **Document Management**: Upload and verify business licenses and documents
- **Payout Tracking**: View settlement history, upcoming payouts

### Therapist Portal
- **Assignment Dashboard**: View today's and upcoming service assignments
- **Schedule Management**: Set weekly availability, breaks, max bookings per day
- **Leave Management**: Apply for leaves (sick, casual, emergency, annual)
- **Real-Time Location**: GPS tracking during active service delivery
- **Performance Dashboard**: View ratings, completed services, monthly earnings
- **Earnings Tracker**: Track daily/weekly/monthly income, tips, and commissions
- **Service History**: Complete record with customer feedback
- **Profile Management**: Update skills, certifications, languages, experience
- **Notification Center**: Real-time alerts for new assignments

### Beautician Portal
- **Profile & Specializations**: Manage beauty service specializations
- **Salon-Based Assignments**: Work with multiple salons
- **Service Scheduling**: Availability management per salon
- **Performance Tracking**: Monthly metrics and KPIs
- **Earnings & Tips**: Track income across all salons
- **Rating System**: Customer ratings and feedback

### Employee Portal
- **Spa Onboarding**: Add new spas to the platform with verification
- **Vendor Management**: Approve/reject vendor applications
- **Attendance Tracking**: Self-attendance with GPS location tagging
- **Leave Management**: Apply for and track leave requests
- **HR Documents**: Access salary slips, offer letters, documents
- **Department Dashboard**: Role-specific dashboards for each department
- **Task Management**: Department-specific workflows

### Admin Portal
- **User Management**: Manage all platform users across roles
- **Vendor Approval**: Review and approve new vendor registrations
- **System Analytics**: Platform-wide performance metrics
- **Financial Overview**: Revenue, commissions, payouts tracking
- **Security Monitoring**: Track system security and alerts
- **Location Tracking**: Monitor employee and therapist locations
- **Role Management**: Assign roles and permissions
- **Support Tickets**: Manage customer support requests
- **Report Generation**: Generate business reports and insights

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Supabase Account**: Free tier available at [supabase.com](https://supabase.com)
- **Git**: For version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ombaro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)

   b. Copy your project credentials:
      - Project URL: `Settings` → `API` → `Project URL`
      - Anon Key: `Settings` → `API` → `Project API keys` → `anon public`

   c. Create `.env` file in project root:
      ```env
      VITE_SUPABASE_URL=https://your-project.supabase.co
      VITE_SUPABASE_ANON_KEY=your-anon-key
      ```

4. **Apply Database Migrations**

   Open Supabase Dashboard → SQL Editor and execute migrations in order:

   ```
   1. supabase/migrations/20250115_clean_production_schema.sql
   2. supabase/migrations/20251007210243_01_vendor_onboarding_core_tables.sql
   3. supabase/migrations/20251007210817_02_automated_notification_triggers.sql
   4. supabase/migrations/20251007214414_create_vendor_categories_table.sql
   5. supabase/migrations/20251007214446_add_vendor_category_columns.sql
   6. supabase/migrations/20251007214624_vendor_onboarding_support_tables.sql
   7. supabase/migrations/20251007220000_vendor_social_auth_and_otp.sql
   8. supabase/migrations/20251007225206_create_departments_and_dashboard_infrastructure.sql
   9. supabase/migrations/20251007230000_create_beauticians_portal.sql
   ```

   See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed instructions.

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:5173`

6. **Access Application**
   - Open browser to `http://localhost:5173`
   - Create account or use test credentials
   - See [QUICK_START.md](./QUICK_START.md) for role-specific guides

---

## Technology Stack

### Web Application
- **Frontend**: React 18.3+, TypeScript 5.5+
- **Build Tool**: Vite 5.4+ (fast HMR, optimized builds)
- **Styling**: Tailwind CSS 3.4+ (utility-first CSS)
- **Icons**: Lucide React 0.344+ (modern icon library)
- **State Management**: React Context API with Custom Hooks
- **Database**: Supabase (PostgreSQL 15+ with extensions)
- **Authentication**: Supabase Auth (Email/Password, JWT)
- **Real-Time**: Supabase Realtime (WebSocket subscriptions)
- **Storage**: Supabase Storage (file uploads)
- **Deployment**: Static hosting (Netlify, Vercel, Cloudflare Pages)

### Mobile Application
- **Framework**: React Native with Expo SDK
- **Navigation**: React Navigation 6
- **Location**: Expo Location API
- **Notifications**: Expo Notifications
- **Database**: Supabase JavaScript SDK (shared with web)
- **Authentication**: Supabase Auth with secure storage
- **Build**: Expo Build Service (EAS)
- **Distribution**: iOS App Store, Google Play Store

### Backend (Optional)
- **Primary Backend**: Supabase (PostgreSQL + Edge Functions + Auth)
- **Additional API**: FastAPI 0.109+ (for complex business logic)
- **Language**: Python 3.11+
- **Database Client**: Supabase Python SDK
- **Caching**: Redis 7+ with aioredis
- **Authentication**: Supabase Auth + JWT validation
- **Documentation**: OpenAPI 3.0 (Swagger UI + ReDoc)
- **Server**: Uvicorn with async workers
- **Note**: Most API needs are handled by Supabase directly

### Database & Backend Services
- **Database**: PostgreSQL 15+ (Supabase hosted)
- **Row Level Security**: Enabled on all tables
- **Real-Time Engine**: Elixir Phoenix (Supabase Realtime)
- **Edge Functions**: Deno runtime (for serverless functions)
- **Authentication**: GoTrue (Supabase Auth server)
- **Storage**: S3-compatible object storage
- **Extensions**: PostGIS (geography), pg_stat_statements, pgcrypto

---

## Project Structure

```
ombaro/
├── src/                          # React application source
│   ├── components/               # React components by feature
│   │   ├── admin/               # Admin dashboard components
│   │   ├── auth/                # Authentication screens
│   │   ├── beautician/          # Beautician portal
│   │   ├── booking/             # Booking components
│   │   ├── department/          # Department dashboards
│   │   ├── documentation/       # Doc portal components
│   │   ├── employee/            # Employee portal
│   │   ├── therapist/           # Therapist portal
│   │   ├── vendor/              # Vendor portal
│   │   └── ui/                  # Reusable UI components
│   ├── context/                 # React Context providers
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Supabase client setup
│   ├── services/                # API service layer
│   ├── types/                   # TypeScript type definitions
│   ├── App.tsx                  # Main application component
│   └── main.tsx                 # Application entry point
├── supabase/                    # Supabase configuration
│   └── migrations/              # Database migration files (9 files)
├── backend/                     # Optional Python API
│   ├── app/                     # FastAPI application
│   └── requirements.txt         # Python dependencies
├── OMBAROMobile/                # React Native mobile app
│   ├── src/                     # Mobile app source
│   └── app.json                 # Expo configuration
├── public/                      # Static assets
├── dist/                        # Production build output
└── *.md                        # Documentation files (19 files)
```

---

## Environment Setup

### Web Application (.env)
```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: Google Maps (for location features)
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key

# Optional: Analytics
VITE_GA_TRACKING_ID=your_ga_id

# Optional: Sentry Error Tracking
VITE_SENTRY_DSN=your_sentry_dsn
```

### Mobile Application (.env)
```env
# Supabase Configuration (Required)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Google Maps
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key

# Optional: OneSignal Push Notifications
EXPO_PUBLIC_ONESIGNAL_APP_ID=your_onesignal_id
```

### Backend API - Optional (.env)
```env
# Supabase (Required if using backend)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Redis (Optional - for caching)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379/0

# API Configuration
API_V1_PREFIX=/api/v1
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Optional: External Services
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

---

## Development Workflow

### Running the Web App

```bash
# Install dependencies
npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### Running the Mobile App

```bash
cd OMBAROMobile

# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Create production build
npx eas build --platform ios
npx eas build --platform android
```

### Running the Backend (Optional)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Access API documentation
# Swagger UI: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
```

---

## Deployment

### Web Application

#### Netlify
```bash
# Build
npm run build

# Deploy (automatic from GitHub)
# Or manual: drag dist/ folder to Netlify

# Environment variables in Netlify dashboard:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

#### Cloudflare Pages
```bash
# Connect GitHub repo in Cloudflare dashboard
# Build command: npm run build
# Build output: dist
# Add environment variables in dashboard
```

### Mobile Application

#### iOS
```bash
# Build with EAS
npx eas build --platform ios

# Submit to App Store
npx eas submit --platform ios
```

#### Android
```bash
# Build with EAS
npx eas build --platform android

# Submit to Play Store
npx eas submit --platform android
```

---

## Documentation

Comprehensive documentation is available in the following files:

### Getting Started
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide for all user roles
- **[QUICK_START_THERAPIST.md](./QUICK_START_THERAPIST.md)** - Therapist-specific quick start
- **[VENDOR_ONBOARDING_GUIDE.md](./VENDOR_ONBOARDING_GUIDE.md)** - Vendor registration and setup
- **[THERAPIST_LOGIN_GUIDE.md](./THERAPIST_LOGIN_GUIDE.md)** - Therapist login and setup

### Technical Documentation
- **[TECHNICAL_IMPLEMENTATION_GUIDE.md](./TECHNICAL_IMPLEMENTATION_GUIDE.md)** - Technical implementation details
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Complete database schema reference
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Database migration instructions
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference

### Architecture & Design
- **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - High-level project overview
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Documentation navigation

### Backend & Integration
- **[BACKEND_SETUP_GUIDE.md](./BACKEND_SETUP_GUIDE.md)** - Backend setup instructions
- **[REDIS_GUIDE.md](./REDIS_GUIDE.md)** - Redis integration guide

### Implementation Summaries
- **[COMPLETE_WORKFLOW_GUIDE.md](./COMPLETE_WORKFLOW_GUIDE.md)** - Complete workflow documentation
- **[COMPLETE_IMPLEMENTATION_SUMMARY.md](./COMPLETE_IMPLEMENTATION_SUMMARY.md)** - Implementation summary
- **[DEPARTMENT_DASHBOARDS_IMPLEMENTATION.md](./DEPARTMENT_DASHBOARDS_IMPLEMENTATION.md)** - Department features
- **[DEPARTMENT_TRANSFORMATION_COMPLETE.md](./DEPARTMENT_TRANSFORMATION_COMPLETE.md)** - Department transformation
- **[THERAPIST_SYSTEM_IMPLEMENTATION.md](./THERAPIST_SYSTEM_IMPLEMENTATION.md)** - Therapist system details
- **[SCHEMA_CLEANUP_SUMMARY.md](./SCHEMA_CLEANUP_SUMMARY.md)** - Schema cleanup details

---

## Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Integration Tests
```bash
# Run integration tests
npm run test:integration

# Test specific portal
npm run test:integration -- --grep "vendor"
```

### E2E Tests
```bash
# Install Playwright
npm run test:e2e:install

# Run E2E tests
npm run test:e2e

# Run tests in UI mode
npm run test:e2e:ui
```

---

## Contributing

1. Follow existing code patterns and conventions
2. Write tests for new features
3. Update documentation as needed
4. Test on both web and mobile platforms
5. Ensure responsive design for web
6. Test on both iOS and Android for mobile
7. Test API endpoints with Swagger/Postman
8. Follow TypeScript best practices
9. Use Tailwind utility classes for styling
10. Ensure Row Level Security policies are correct

---

## Security

### Authentication
- Supabase Auth with JWT tokens
- Email/password authentication
- Optional: Social OAuth (Google, Facebook)
- OTP-based verification for vendors

### Authorization
- Row Level Security (RLS) on all tables
- Role-based access control (RBAC)
- Department-based permissions
- Fine-grained permissions system

### Data Protection
- Encrypted data at rest (AES-256)
- TLS encryption in transit
- Sensitive data encryption (bank details, documents)
- Audit logging for all critical actions
- Regular security audits

---

## Performance

### Web Optimization
- Code splitting with React.lazy()
- Image optimization (WebP, lazy loading)
- Bundle size optimization
- Service Worker for offline support
- CDN for static assets

### Database Optimization
- Strategic indexing (150+ indexes)
- Query optimization with statistics
- Connection pooling (Supavisor)
- Read replicas for reporting
- Caching strategy with Redis

### Real-Time Performance
- WebSocket connection pooling
- Selective subscription to channels
- Efficient delta updates
- Automatic reconnection

---

## Support

For technical support or questions:
- **General Support**: support@ombaro.com
- **API/Technical**: api-support@ombaro.com
- **Frontend**: frontend@ombaro.com
- **DevOps**: devops@ombaro.com
- **Emergency**: +91-XXXX-XXXXXX

---

## License

This project is proprietary software. All rights reserved.

---

## Changelog

### Version 1.7 (October 7, 2025)
- Added Beautician Portal with specialized features
- Enhanced department dashboard infrastructure
- Implemented vendor social authentication
- Added automated notification triggers
- Vendor categorization system

### Version 1.0 (January 15, 2025)
- Initial production release
- 60+ database tables
- Multi-portal authentication
- Real-time tracking system
- Complete booking workflow
- Payment integration
- Loyalty program

---

**Version**: 1.7
**Last Updated**: October 7, 2025
**Status**: Production Ready ✅
