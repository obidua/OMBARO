# Backend Setup Guide

This guide will help you set up and run the Ombaro FastAPI backend.

## Prerequisites

- Python 3.11 or higher
- PostgreSQL 15 or higher
- Redis 7 or higher
- pip (Python package manager)

## Quick Start

### 1. Install Python Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Install and Configure PostgreSQL

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE ombaro_db;
CREATE USER ombaro_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ombaro_db TO ombaro_user;
\q
```

#### macOS
```bash
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb ombaro_db
```

#### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run installer and follow setup wizard
3. Create database using pgAdmin

### 3. Install and Configure Redis

#### Ubuntu/Debian
```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Test Redis
redis-cli ping  # Should return PONG
```

#### macOS
```bash
brew install redis
brew services start redis

# Test Redis
redis-cli ping  # Should return PONG
```

#### Windows
Download from https://github.com/microsoftarchive/redis/releases

Or use Docker:
```bash
docker run -d --name redis -p 6379:6379 redis:7-alpine
```

### 4. Configure Environment Variables

```bash
cd backend
cp .env.example .env
```

Edit `.env` file with your settings:

```env
# Database Configuration
DATABASE_URL=postgresql://ombaro_user:your_password@localhost:5432/ombaro_db
ASYNC_DATABASE_URL=postgresql+asyncpg://ombaro_user:your_password@localhost:5432/ombaro_db

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_URL=redis://localhost:6379/0

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production-use-openssl-rand-hex-32
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# API Configuration
API_V1_PREFIX=/api/v1
PROJECT_NAME=Ombaro Spa Services
DEBUG=True

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

To generate a secure SECRET_KEY:
```bash
openssl rand -hex 32
```

### 5. Start the Backend Server

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API Base URL**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Testing the API

### 1. Using Swagger UI (Recommended)

1. Open http://localhost:8000/docs in your browser
2. Click on any endpoint to expand it
3. Click "Try it out"
4. Fill in the parameters
5. Click "Execute"

### 2. Using cURL

```bash
# Health Check
curl http://localhost:8000/health

# Send OTP
curl -X POST http://localhost:8000/api/v1/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile": "+919876543210"}'

# Verify OTP
curl -X POST http://localhost:8000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile": "+919876543210", "otp": "123456"}'

# Get Customer Profile (with token)
curl -X GET http://localhost:8000/api/v1/customer/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. Using Postman

1. Import the OpenAPI spec from http://localhost:8000/openapi.json
2. Set up environment variables for `base_url` and `access_token`
3. Test endpoints

## Verify Installation

Run these commands to verify everything is working:

```bash
# Check Python version
python --version  # Should be 3.11+

# Check PostgreSQL
psql -U ombaro_user -d ombaro_db -c "SELECT version();"

# Check Redis
redis-cli ping  # Should return PONG

# Check backend server
curl http://localhost:8000/health
```

Expected health check response:
```json
{
  "status": "healthy",
  "database": "connected",
  "redis": "connected"
}
```

## API Endpoints Overview

### Authentication (No auth required)
- `POST /api/v1/auth/send-otp` - Send OTP to mobile
- `POST /api/v1/auth/verify-otp` - Verify OTP and get tokens
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login with credentials
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Customer APIs (Role: customer)
- `GET /api/v1/customer/profile` - Get profile
- `PUT /api/v1/customer/profile` - Update profile
- `GET /api/v1/customer/vendors` - Search vendors
- `GET /api/v1/customer/vendors/{id}` - Get vendor details
- `POST /api/v1/customer/bookings` - Create booking
- `GET /api/v1/customer/bookings` - List bookings
- `GET /api/v1/customer/bookings/{id}` - Get booking details
- `PUT /api/v1/customer/bookings/{id}` - Update booking
- `DELETE /api/v1/customer/bookings/{id}` - Cancel booking
- `POST /api/v1/customer/bookings/{id}/review` - Add review
- `GET /api/v1/customer/favorites` - Get favorites
- `POST /api/v1/customer/favorites/{id}` - Add favorite
- `DELETE /api/v1/customer/favorites/{id}` - Remove favorite

### Therapist APIs (Role: therapist)
- `GET /api/v1/therapist/profile` - Get profile
- `PUT /api/v1/therapist/profile` - Update profile
- `GET /api/v1/therapist/assignments` - List assignments
- `GET /api/v1/therapist/assignments/{id}` - Get assignment details
- `PUT /api/v1/therapist/assignments/{id}/status` - Update assignment status
- `GET /api/v1/therapist/schedule` - Get schedule
- `PUT /api/v1/therapist/schedule` - Update schedule
- `GET /api/v1/therapist/leaves` - List leave requests
- `POST /api/v1/therapist/leaves` - Apply for leave
- `GET /api/v1/therapist/earnings` - Get earnings
- `GET /api/v1/therapist/performance` - Get performance metrics
- `POST /api/v1/therapist/location` - Update location
- `GET /api/v1/therapist/location` - Get current location
- `PUT /api/v1/therapist/availability` - Update availability status

### Vendor APIs (Role: vendor)
- `GET /api/v1/vendor/profile` - Get profile
- `PUT /api/v1/vendor/profile` - Update profile
- `GET /api/v1/vendor/therapists` - List therapists
- `POST /api/v1/vendor/therapists` - Add therapist
- `PUT /api/v1/vendor/therapists/{id}` - Update therapist
- `DELETE /api/v1/vendor/therapists/{id}` - Remove therapist
- `GET /api/v1/vendor/services` - List services
- `POST /api/v1/vendor/services` - Add service
- `PUT /api/v1/vendor/services/{id}` - Update service
- `DELETE /api/v1/vendor/services/{id}` - Remove service
- `GET /api/v1/vendor/bookings` - List bookings
- `GET /api/v1/vendor/bookings/{id}` - Get booking details
- `POST /api/v1/vendor/bookings/{id}/assign` - Assign therapist
- `GET /api/v1/vendor/dashboard` - Get dashboard stats
- `GET /api/v1/vendor/revenue` - Get revenue analytics
- `GET /api/v1/vendor/attendance` - Get attendance records
- `GET /api/v1/vendor/reviews` - Get reviews

### Employee APIs (Role: employee)
- `GET /api/v1/employee/profile` - Get profile
- `GET /api/v1/employee/vendors` - List vendors
- `GET /api/v1/employee/vendors/{id}` - Get vendor details
- `PUT /api/v1/employee/vendors/{id}/status` - Update vendor status
- `GET /api/v1/employee/attendance` - Get own attendance
- `POST /api/v1/employee/attendance/checkin` - Check in
- `POST /api/v1/employee/attendance/checkout` - Check out
- `GET /api/v1/employee/leaves` - List own leaves
- `POST /api/v1/employee/leaves` - Apply for leave
- `GET /api/v1/employee/documents` - Get documents
- `GET /api/v1/employee/reports` - Get reports

### Admin APIs (Role: admin)
- `GET /api/v1/admin/dashboard` - Get dashboard stats
- `GET /api/v1/admin/users` - List all users
- `GET /api/v1/admin/users/{id}` - Get user details
- `PUT /api/v1/admin/users/{id}/status` - Update user status
- `DELETE /api/v1/admin/users/{id}` - Delete user
- `GET /api/v1/admin/vendors` - List all vendors
- `GET /api/v1/admin/vendors/pending-approval` - Get pending vendors
- `PUT /api/v1/admin/vendors/{id}/approve` - Approve vendor
- `PUT /api/v1/admin/vendors/{id}/reject` - Reject vendor
- `GET /api/v1/admin/bookings` - List all bookings
- `GET /api/v1/admin/revenue` - Get revenue analytics
- `GET /api/v1/admin/reports/bookings` - Generate booking report
- `GET /api/v1/admin/reports/vendors` - Generate vendor report
- `GET /api/v1/admin/settings` - Get platform settings
- `PUT /api/v1/admin/settings` - Update platform settings
- `GET /api/v1/admin/roles` - List roles
- `POST /api/v1/admin/roles` - Create role
- `GET /api/v1/admin/audit-logs` - Get audit logs

## Common Issues & Solutions

### Issue: "Could not connect to database"

**Solution:**
1. Check if PostgreSQL is running: `sudo systemctl status postgresql`
2. Verify database credentials in `.env`
3. Test connection: `psql -U ombaro_user -d ombaro_db`

### Issue: "Could not connect to Redis"

**Solution:**
1. Check if Redis is running: `sudo systemctl status redis-server`
2. Test Redis: `redis-cli ping`
3. Verify Redis URL in `.env`

### Issue: "Module not found"

**Solution:**
```bash
pip install -r requirements.txt
```

### Issue: "Port 8000 already in use"

**Solution:**
```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or use a different port
uvicorn app.main:app --reload --port 8001
```

## Production Deployment

### Using Docker

Create `Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t ombaro-api .
docker run -p 8000:8000 --env-file .env ombaro-api
```

### Using systemd (Linux)

Create `/etc/systemd/system/ombaro-api.service`:
```ini
[Unit]
Description=Ombaro API
After=network.target postgresql.service redis.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/ombaro/backend
Environment="PATH=/var/www/ombaro/backend/venv/bin"
ExecStart=/var/www/ombaro/backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

Start service:
```bash
sudo systemctl enable ombaro-api
sudo systemctl start ombaro-api
sudo systemctl status ombaro-api
```

## Performance Tuning

### Redis Configuration

Edit `/etc/redis/redis.conf`:
```conf
maxmemory 2gb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

### PostgreSQL Configuration

Edit `/etc/postgresql/15/main/postgresql.conf`:
```conf
max_connections = 100
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
```

### Uvicorn Workers

For production, use multiple workers:
```bash
uvicorn app.main:app --workers 4 --host 0.0.0.0 --port 8000
```

Or use Gunicorn with Uvicorn workers:
```bash
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Monitoring

### Logs

View application logs:
```bash
# Development
tail -f uvicorn.log

# Production (systemd)
sudo journalctl -u ombaro-api -f
```

### Redis Monitoring

```bash
redis-cli INFO
redis-cli MONITOR
```

### PostgreSQL Monitoring

```bash
psql -U ombaro_user -d ombaro_db -c "SELECT * FROM pg_stat_activity;"
```

## Security Checklist

- [ ] Change default SECRET_KEY in `.env`
- [ ] Use strong PostgreSQL password
- [ ] Enable Redis authentication in production
- [ ] Set DEBUG=False in production
- [ ] Configure proper CORS origins
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Enable database backups
- [ ] Set up firewall rules
- [ ] Monitor security logs

## Next Steps

1. Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API reference
2. Read [REDIS_GUIDE.md](./REDIS_GUIDE.md) for Redis best practices
3. Set up frontend to connect to API
4. Configure production environment
5. Set up monitoring and logging

## Support

For backend support:
- Email: api-support@ombaro.com
- Documentation: Check API_DOCUMENTATION.md
- Issues: Report bugs to development team
