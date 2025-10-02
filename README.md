# OMBARO - Beauty & Wellness Platform

> **Complete project overview available in [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)**
> **Database schema documentation in [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)**

A comprehensive beauty and wellness platform with web, mobile, and backend applications, featuring multi-portal authentication for customers, employees, vendors, therapists, and administrators.

## Database

- **Tables**: 60 essential tables (optimized from 143)
- **Technology**: PostgreSQL via Supabase
- **Migration**: `supabase/migrations/20250115_clean_production_schema.sql`
- **Documentation**: See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

## Project Structure

This repository contains three main applications:

### 1. Web Application (Current Directory)
- **Technology**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Features**: Responsive web interface, PWA capabilities
- **Target**: Desktop and mobile browsers

### 2. Mobile Application (`/OMBAROMobile`)
- **Technology**: React Native + Expo + TypeScript
- **Styling**: React Native StyleSheet
- **Features**: Native mobile experience for iOS and Android
- **Target**: iOS and Android app stores

### 3. Backend API (`/backend`)
- **Technology**: FastAPI + Python 3.11+
- **Database**: PostgreSQL 15+
- **Caching**: Redis 7+
- **Authentication**: JWT (JSON Web Tokens)
- **Features**: RESTful API, async/await, comprehensive role-based access control
- **Documentation**: Auto-generated OpenAPI (Swagger/ReDoc)

## Features

### Customer Portal
- **Service Discovery**: Find nearby spas and wellness centers
- **Booking System**: Schedule appointments with real-time availability
- **Payment Integration**: Secure payment processing
- **Order Tracking**: Real-time tracking of service providers
- **Review System**: Rate and review completed services

### Employee Portal
- **Spa Onboarding**: Add new spas to the platform
- **Vendor Management**: Manage spa partnerships
- **Attendance Tracking**: Self-attendance with location tagging
- **Leave Management**: Apply for and track leave requests
- **HR Documents**: Access salary slips and official documents

### Vendor Portal
- **Service Management**: Add and manage offered services
- **Booking Management**: View and manage customer bookings
- **Therapist Management**: Add, manage, and assign therapists to bookings
- **Task Assignment**: Assign spa services to therapists with scheduling
- **Analytics Dashboard**: Track performance and revenue
- **Customer Reviews**: Monitor and respond to feedback

### Therapist Portal
- **Assignment Dashboard**: View and manage assigned tasks
- **Schedule Management**: Manage availability and working hours
- **Leave Requests**: Apply for and track leave requests
- **Location Tracking**: Real-time location sharing during service
- **Performance Metrics**: Track ratings, earnings, and completion rates

### Admin Portal
- **User Management**: Manage all platform users
- **Spa Approval**: Review and approve new spa registrations
- **System Analytics**: Platform-wide performance metrics
- **Security Monitoring**: Track system security and alerts
- **Location Tracking**: Monitor employee locations in real-time

## Getting Started

### Backend API

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database and Redis credentials
   ```

5. Install and start PostgreSQL:
   ```bash
   # Ubuntu/Debian
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql

   # macOS
   brew install postgresql
   brew services start postgresql

   # Create database
   createdb ombaro_db
   ```

6. Install and start Redis:
   ```bash
   # Ubuntu/Debian
   sudo apt install redis-server
   sudo systemctl start redis-server

   # macOS
   brew install redis
   brew services start redis
   ```

7. Start development server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

8. Access API documentation:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc
   - Health Check: http://localhost:8000/health

### Web Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   # Create .env file with API URL
   VITE_API_URL=http://localhost:8000
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Mobile Application

1. Navigate to mobile directory:
   ```bash
   cd OMBAROMobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   # Create .env file with API URL
   EXPO_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start Expo development server:
   ```bash
   npx expo start
   ```

5. Run on platforms:
   - iOS: Press `i` or scan QR with iOS device
   - Android: Press `a` or scan QR with Android device

## Technology Stack

### Web Application
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks + Context
- **Build Tool**: Vite
- **Deployment**: Static hosting (Netlify, Vercel)

### Mobile Application
- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **Location**: Expo Location
- **Notifications**: Expo Notifications
- **Styling**: React Native StyleSheet
- **State Management**: React Context
- **Build**: Expo Build Service

### Backend API
- **Framework**: FastAPI 0.109+
- **Language**: Python 3.11+
- **Database**: PostgreSQL 15+ with asyncpg
- **ORM**: SQLAlchemy 2.0 (async)
- **Caching**: Redis 7+ with aioredis
- **Authentication**: JWT with python-jose
- **Password Hashing**: bcrypt with passlib
- **CORS**: FastAPI middleware
- **Documentation**: OpenAPI 3.0 (Swagger UI + ReDoc)
- **Server**: Uvicorn with async workers

## Shared Components

Both applications share:
- **Type Definitions**: Common TypeScript interfaces
- **Business Logic**: Authentication, booking, and data management
- **API Integration**: Shared service layer for backend communication
- **Design System**: Consistent colors, spacing, and typography

## Development Guidelines

### Code Organization
- Keep components under 200 lines
- Use TypeScript for type safety
- Implement proper error handling
- Follow platform-specific best practices

### Styling
- **Web**: Use Tailwind CSS utility classes
- **Mobile**: Use React Native StyleSheet with consistent design tokens
- Maintain visual consistency across platforms

### State Management
- Use React Context for global state
- Keep local state minimal and focused
- Implement proper loading and error states

## Deployment

### Web Application
- Build: `npm run build`
- Deploy to static hosting providers
- Configure environment variables

### Mobile Application
- **Development**: Use Expo Go for testing
- **Production**: Build standalone apps with `expo build`
- **Distribution**: Submit to App Store and Google Play

## Environment Setup

### Backend (.env)
```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ombaro_db
ASYNC_DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/ombaro_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379/0

# JWT
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# API
API_V1_PREFIX=/api/v1
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Web (.env)
```
VITE_API_URL=http://localhost:8000
VITE_MAPS_API_KEY=your_maps_api_key
```

### Mobile (.env)
```
EXPO_PUBLIC_API_URL=http://localhost:8000
EXPO_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

## Documentation

Comprehensive documentation is available in the following files:

### API Documentation
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**: Complete API reference with endpoints for all roles
  - Authentication endpoints
  - Customer portal APIs
  - Therapist portal APIs
  - Vendor portal APIs
  - Employee portal APIs
  - Admin portal APIs
  - Error handling and status codes
  - Rate limiting and pagination

### Redis Guide
- **[REDIS_GUIDE.md](./REDIS_GUIDE.md)**: Complete Redis integration guide
  - Installation and setup instructions
  - Redis architecture and data structure
  - Use cases (OTP, caching, location tracking, rate limiting)
  - Role-specific Redis usage
  - Best practices and troubleshooting
  - Monitoring and performance optimization

### Role-Specific Guides
- **[THERAPIST_LOGIN_GUIDE.md](./THERAPIST_LOGIN_GUIDE.md)**: Therapist portal login guide
- **[VENDOR_ONBOARDING_GUIDE.md](./VENDOR_ONBOARDING_GUIDE.md)**: Vendor onboarding process
- **[QUICK_START_THERAPIST.md](./QUICK_START_THERAPIST.md)**: Quick start for therapists

### Technical Documentation
- **[TECHNICAL_IMPLEMENTATION_GUIDE.md](./TECHNICAL_IMPLEMENTATION_GUIDE.md)**: Technical implementation details
- **[DATABASE_SCHEMA_DOCUMENTATION.md](./DATABASE_SCHEMA_DOCUMENTATION.md)**: Database schema documentation
- **[COMPLETE_WORKFLOW_GUIDE.md](./COMPLETE_WORKFLOW_GUIDE.md)**: Complete workflow guide

## API Testing

### Using Swagger UI
1. Start the backend server
2. Navigate to http://localhost:8000/docs
3. Click "Authorize" and enter JWT token
4. Test endpoints interactively

### Using cURL
```bash
# Get OTP
curl -X POST http://localhost:8000/api/v1/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile": "+919876543210"}'

# Login with OTP
curl -X POST http://localhost:8000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile": "+919876543210", "otp": "123456"}'

# Get profile (with token)
curl -X GET http://localhost:8000/api/v1/customer/profile \
  -H "Authorization: Bearer <access_token>"
```

### Using Postman
Import the OpenAPI spec from http://localhost:8000/openapi.json

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Web App    │  │  Mobile App  │  │   Admin      │  │
│  │  (React)     │  │ (React Native)│  │   Portal     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS/REST
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   API Gateway/Backend                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │           FastAPI Application                     │  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │  │
│  │  │  Auth  │ │Customer│ │Therapist│ │ Vendor │   │  │
│  │  │  APIs  │ │  APIs  │ │  APIs  │ │  APIs  │   │  │
│  │  └────────┘ └────────┘ └────────┘ └────────┘   │  │
│  │  ┌────────┐ ┌────────┐                          │  │
│  │  │Employee│ │ Admin  │      JWT Auth            │  │
│  │  │  APIs  │ │  APIs  │      Middleware          │  │
│  │  └────────┘ └────────┘                          │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
              │                         │
              ▼                         ▼
┌──────────────────────┐   ┌──────────────────────┐
│   PostgreSQL DB      │   │      Redis Cache     │
│                      │   │                      │
│  ┌───────────────┐  │   │  ┌───────────────┐  │
│  │ Users         │  │   │  │ OTP Codes     │  │
│  │ Bookings      │  │   │  │ Sessions      │  │
│  │ Services      │  │   │  │ Cache Data    │  │
│  │ Therapists    │  │   │  │ Location      │  │
│  │ Vendors       │  │   │  │ Rate Limits   │  │
│  └───────────────┘  │   │  └───────────────┘  │
└──────────────────────┘   └──────────────────────┘
```

## Contributing

1. Follow existing code patterns and conventions
2. Write tests for new features
3. Update documentation as needed
4. Test on both web and mobile platforms
5. Ensure responsive design for web
6. Test on both iOS and Android for mobile
7. Test API endpoints with Swagger/Postman

## License

This project is proprietary software. All rights reserved.

## Support

For technical support or questions:
- API Support: api-support@ombaro.com
- Frontend Support: frontend@ombaro.com
- DevOps Support: devops@ombaro.com