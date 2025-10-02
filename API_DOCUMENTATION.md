# Ombaro API Documentation

## Overview

The Ombaro API is a comprehensive backend system for a spa and wellness services booking platform. It provides RESTful endpoints for customers, therapists, vendors, employees, and administrators.

## Base URL

```
Production: https://api.ombaro.com
Development: http://localhost:8000
```

## Architecture

### Technology Stack

- **Backend Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15+
- **Caching**: Redis 7+
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: OpenAPI 3.0 (Swagger/ReDoc)

### Key Features

- Role-based access control (RBAC)
- JWT authentication with refresh tokens
- Redis caching for improved performance
- Async/await for better concurrency
- Comprehensive error handling
- Auto-generated API documentation

## Authentication

### JWT Token Structure

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Token Types

1. **Access Token**: Short-lived (30 minutes), used for API requests
2. **Refresh Token**: Long-lived (7 days), used to obtain new access tokens

### User Roles

- `customer`: End users who book services
- `therapist`: Service providers
- `vendor`: Spa/business owners
- `employee`: Platform employees
- `admin`: Platform administrators

## API Endpoints by Role

### Authentication Endpoints

All authentication endpoints are public (no token required).

#### POST /api/v1/auth/send-otp

Send OTP to mobile number for verification.

**Request Body:**
```json
{
  "mobile": "+919876543210"
}
```

**Response:**
```json
{
  "message": "OTP sent successfully",
  "mobile": "+919876543210",
  "otp": "123456"
}
```

**Caching**: OTP stored in Redis for 5 minutes

---

#### POST /api/v1/auth/verify-otp

Verify OTP and get JWT tokens.

**Request Body:**
```json
{
  "mobile": "+919876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "user_9876543210",
    "mobile": "+919876543210",
    "role": "customer"
  }
}
```

---

#### POST /api/v1/auth/register

Register new user with complete details.

**Request Body:**
```json
{
  "mobile": "+919876543210",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "customer",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "user_123456",
    "mobile": "+919876543210",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer",
    "status": "active"
  }
}
```

---

#### POST /api/v1/auth/refresh

Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGc..."
}
```

**Response:**
```json
{
  "access_token": "new_access_token",
  "refresh_token": "same_refresh_token",
  "token_type": "bearer",
  "user": {
    "id": "user_123456",
    "role": "customer"
  }
}
```

---

### Customer Endpoints

All customer endpoints require `customer` role.

#### GET /api/v1/customer/profile

Get customer profile details.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": "user_123",
  "name": "John Doe",
  "mobile": "+919876543210",
  "email": "john@example.com",
  "address": "123 Main St, Mumbai",
  "total_bookings": 25,
  "loyalty_points": 500
}
```

**Caching**: Profile cached for 5 minutes

---

#### GET /api/v1/customer/vendors

Search and filter nearby vendors.

**Query Parameters:**
- `latitude` (float): User's latitude
- `longitude` (float): User's longitude
- `service_type` (string): Filter by service type
- `radius` (int): Search radius in km (default: 5)

**Response:**
```json
[
  {
    "id": "vendor_1",
    "name": "Serenity Spa",
    "rating": 4.8,
    "total_reviews": 156,
    "distance": 2.3,
    "address": "Koramangala, Bangalore",
    "services": ["Swedish Massage", "Deep Tissue"],
    "price_range": "₹1000-₹3000",
    "images": ["/api/placeholder/400/300"]
  }
]
```

**Caching**: Vendor list cached for 5 minutes per location

---

#### POST /api/v1/customer/bookings

Create new booking.

**Request Body:**
```json
{
  "vendor_id": "vendor_1",
  "services": [
    {
      "service_id": "service_1",
      "quantity": 1,
      "price": 2000
    }
  ],
  "booking_date": "2025-01-20",
  "booking_time": "14:00",
  "location": {
    "address": "123 Main St",
    "latitude": 12.9716,
    "longitude": 77.5946
  },
  "special_requests": "Prefer female therapist"
}
```

**Response:**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": "booking_20250120140000",
    "customer_id": "user_123",
    "vendor_id": "vendor_1",
    "booking_date": "2025-01-20",
    "booking_time": "14:00",
    "services": [...],
    "total_amount": 2000,
    "status": "pending",
    "payment_status": "pending"
  }
}
```

---

#### GET /api/v1/customer/bookings

Get customer's bookings with optional status filter.

**Query Parameters:**
- `status` (string, optional): Filter by booking status

**Response:**
```json
{
  "bookings": [
    {
      "id": "booking_1",
      "vendor_name": "Serenity Spa",
      "booking_date": "2025-01-15",
      "booking_time": "14:00",
      "services": ["Swedish Massage"],
      "total_amount": 2000,
      "status": "completed",
      "therapist": {
        "name": "Priya Sharma",
        "rating": 4.9
      }
    }
  ],
  "total": 25
}
```

---

### Therapist Endpoints

All therapist endpoints require `therapist` role.

#### GET /api/v1/therapist/profile

Get therapist profile.

**Response:**
```json
{
  "id": "therapist_1",
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "mobile": "+919876543210",
  "employee_id": "TH001",
  "vendor_id": "vendor_1",
  "specialization": ["Swedish Massage", "Deep Tissue"],
  "experience_years": 5,
  "rating": 4.8,
  "total_reviews": 156,
  "status": "active",
  "availability_status": "available"
}
```

**Caching**: Profile cached for 5 minutes

---

#### GET /api/v1/therapist/assignments

Get therapist assignments.

**Query Parameters:**
- `status` (string, optional): Filter by assignment status
- `date` (date, optional): Filter by date

**Response:**
```json
{
  "assignments": [
    {
      "id": "assignment_1",
      "booking_id": "booking_1",
      "customer_name": "John Doe",
      "customer_phone": "+919876543210",
      "service_name": "Swedish Massage",
      "duration": 60,
      "assignment_date": "2025-01-15",
      "assignment_time": "14:00",
      "location": {
        "address": "123 Main St, Bangalore",
        "latitude": 12.9716,
        "longitude": 77.5946
      },
      "status": "assigned",
      "payment_amount": 2000
    }
  ],
  "total": 12
}
```

---

#### PUT /api/v1/therapist/assignments/{assignment_id}/status

Update assignment status (start, complete, cancel).

**Request Body:**
```json
{
  "status": "in_progress",
  "notes": "Started service"
}
```

**Response:**
```json
{
  "message": "Assignment status updated",
  "assignment_id": "assignment_1",
  "new_status": "in_progress"
}
```

---

#### GET /api/v1/therapist/earnings

Get earnings summary and transaction history.

**Query Parameters:**
- `start_date` (date, optional)
- `end_date` (date, optional)

**Response:**
```json
{
  "total_earnings": 125000,
  "current_month": 25000,
  "pending_payment": 5000,
  "paid_amount": 120000,
  "transactions": [
    {
      "id": "txn_1",
      "booking_id": "booking_1",
      "customer_name": "John Doe",
      "service_name": "Swedish Massage",
      "date": "2025-01-15",
      "amount": 2000,
      "commission": 200,
      "net_amount": 1800,
      "status": "paid"
    }
  ]
}
```

---

#### POST /api/v1/therapist/location

Update therapist's current location (GPS tracking).

**Request Body:**
```json
{
  "latitude": 12.9716,
  "longitude": 77.5946,
  "accuracy": 10,
  "timestamp": "2025-01-15T14:30:00Z"
}
```

**Response:**
```json
{
  "message": "Location updated successfully"
}
```

**Caching**: Location stored in Redis for 5 minutes

---

### Vendor Endpoints

All vendor endpoints require `vendor` role.

#### GET /api/v1/vendor/profile

Get vendor/spa profile.

**Response:**
```json
{
  "id": "vendor_1",
  "business_name": "Serenity Wellness Spa",
  "owner_name": "Rajesh Kumar",
  "email": "contact@serenity.com",
  "mobile": "+919876543210",
  "address": "123 Main St, Koramangala, Bangalore",
  "rating": 4.8,
  "total_reviews": 256,
  "total_bookings": 1250,
  "status": "active"
}
```

---

#### GET /api/v1/vendor/therapists

Get list of therapists under this vendor.

**Query Parameters:**
- `status` (string, optional): Filter by therapist status

**Response:**
```json
{
  "therapists": [
    {
      "id": "therapist_1",
      "name": "Priya Sharma",
      "employee_id": "TH001",
      "mobile": "+919876543210",
      "specialization": ["Swedish Massage", "Deep Tissue"],
      "experience_years": 5,
      "rating": 4.9,
      "total_reviews": 156,
      "status": "active",
      "availability_status": "available"
    }
  ],
  "total": 8
}
```

---

#### POST /api/v1/vendor/therapists

Add new therapist to vendor.

**Request Body:**
```json
{
  "name": "Anjali Kumar",
  "mobile": "+919876543211",
  "email": "anjali@example.com",
  "specialization": ["Aromatherapy", "Hot Stone"],
  "experience_years": 3,
  "certification": ["Certified Massage Therapist"],
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "Therapist added successfully",
  "therapist_id": "therapist_123",
  "data": {...}
}
```

---

#### GET /api/v1/vendor/bookings

Get bookings for this vendor.

**Query Parameters:**
- `status` (string, optional)
- `date` (date, optional)

**Response:**
```json
{
  "bookings": [
    {
      "id": "booking_1",
      "customer_name": "John Doe",
      "customer_phone": "+919876543210",
      "booking_date": "2025-01-15",
      "booking_time": "14:00",
      "services": ["Swedish Massage"],
      "therapist": "Priya Sharma",
      "total_amount": 2000,
      "status": "confirmed",
      "payment_status": "paid"
    }
  ],
  "total": 125
}
```

---

#### POST /api/v1/vendor/bookings/{booking_id}/assign

Assign therapist to booking.

**Request Body:**
```json
{
  "therapist_id": "therapist_1",
  "assignment_time": "2025-01-20T14:00:00Z"
}
```

**Response:**
```json
{
  "message": "Therapist assigned successfully",
  "booking_id": "booking_1",
  "therapist_id": "therapist_1"
}
```

---

#### GET /api/v1/vendor/dashboard

Get vendor dashboard statistics.

**Response:**
```json
{
  "today_bookings": 12,
  "pending_bookings": 5,
  "total_revenue": 125000,
  "monthly_revenue": 45000,
  "active_therapists": 8,
  "total_customers": 350,
  "average_rating": 4.8
}
```

---

### Employee Endpoints

All employee endpoints require `employee` role.

#### GET /api/v1/employee/vendors

Get list of vendors for management.

**Query Parameters:**
- `status` (string, optional)

**Response:**
```json
{
  "vendors": [
    {
      "id": "vendor_1",
      "business_name": "Serenity Wellness Spa",
      "owner_name": "Rajesh Kumar",
      "location": "Koramangala, Bangalore",
      "status": "active",
      "rating": 4.8,
      "onboarded_by": "You",
      "onboarding_date": "2024-05-15"
    }
  ],
  "total": 47
}
```

---

#### PUT /api/v1/employee/vendors/{vendor_id}/status

Approve or reject vendor application.

**Request Body:**
```json
{
  "status": "approved",
  "notes": "All documents verified"
}
```

**Response:**
```json
{
  "message": "Vendor status updated",
  "vendor_id": "vendor_1",
  "new_status": "approved"
}
```

---

#### GET /api/v1/employee/attendance

Get employee's own attendance records.

**Query Parameters:**
- `start_date` (date, optional)
- `end_date` (date, optional)

**Response:**
```json
{
  "attendance": [
    {
      "date": "2025-01-15",
      "check_in": "09:00",
      "check_out": "18:00",
      "status": "present",
      "working_hours": 9
    }
  ]
}
```

---

### Admin Endpoints

All admin endpoints require `admin` role.

#### GET /api/v1/admin/dashboard

Get platform-wide statistics.

**Response:**
```json
{
  "total_users": 5420,
  "total_vendors": 156,
  "total_therapists": 345,
  "total_bookings": 8750,
  "total_revenue": 12500000,
  "active_bookings": 45,
  "pending_approvals": 12,
  "growth_metrics": {
    "user_growth": 15.5,
    "vendor_growth": 8.3,
    "booking_growth": 22.1,
    "revenue_growth": 18.7
  }
}
```

---

#### GET /api/v1/admin/users

Get all users with filters.

**Query Parameters:**
- `role` (string, optional)
- `status` (string, optional)
- `search` (string, optional)

**Response:**
```json
{
  "users": [
    {
      "id": "user_1",
      "name": "John Doe",
      "mobile": "+919876543210",
      "email": "john@example.com",
      "role": "customer",
      "status": "active",
      "created_at": "2024-05-15",
      "total_bookings": 25
    }
  ],
  "total": 5420
}
```

---

#### GET /api/v1/admin/revenue

Get platform revenue analytics.

**Query Parameters:**
- `start_date` (date, optional)
- `end_date` (date, optional)

**Response:**
```json
{
  "total_revenue": 12500000,
  "current_month": 1250000,
  "last_month": 1100000,
  "growth_percentage": 13.6,
  "commission_earned": 1250000,
  "breakdown_by_category": {
    "massage": 7500000,
    "spa_treatments": 3000000,
    "beauty_services": 2000000
  }
}
```

---

## Error Handling

### Standard Error Response

```json
{
  "detail": "Error message here"
}
```

### HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server error

## Rate Limiting

- Authentication endpoints: 10 requests per minute per IP
- General API endpoints: 100 requests per minute per user
- Location tracking: 1 request per 30 seconds per therapist

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page` (int, default: 1)
- `limit` (int, default: 20, max: 100)

**Response:**
```json
{
  "items": [...],
  "total": 250,
  "page": 1,
  "pages": 13
}
```

## WebSocket Support

Real-time features (future implementation):

- Live booking updates
- Therapist location tracking
- Chat messaging
- Notifications

## Testing

Interactive API documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Support

For API support, contact: api-support@ombaro.com
