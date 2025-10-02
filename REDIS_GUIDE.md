# Redis Integration Guide for Ombaro

## Overview

Redis is used in the Ombaro platform for caching, session management, and temporary data storage to improve performance and reduce database load.

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Redis Architecture](#redis-architecture)
3. [Use Cases](#use-cases)
4. [Implementation Details](#implementation-details)
5. [Best Practices](#best-practices)
6. [Monitoring & Troubleshooting](#monitoring--troubleshooting)

## Installation & Setup

### Local Development

#### Install Redis on Ubuntu/Debian

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

#### Install Redis on macOS

```bash
brew install redis
brew services start redis
```

#### Install Redis on Windows

Download from: https://github.com/microsoftarchive/redis/releases

Or use Docker:
```bash
docker run -d --name redis -p 6379:6379 redis:7-alpine
```

### Configuration

#### Environment Variables

Add these to your `.env` file:

```bash
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_URL=redis://localhost:6379/0
```

#### Production Configuration

For production, use managed Redis services:

**AWS ElastiCache:**
```bash
REDIS_URL=redis://your-cluster.cache.amazonaws.com:6379/0
```

**Redis Cloud:**
```bash
REDIS_URL=redis://default:password@redis-12345.redis.cloud:12345
```

**DigitalOcean Managed Redis:**
```bash
REDIS_URL=redis://default:password@db-redis-prod-do-user-123-0.db.ondigitalocean.com:25061
```

## Redis Architecture

### Data Structure

```
ombaro:otp:{mobile}                    → OTP codes (TTL: 5 minutes)
ombaro:user:{user_id}                  → User session data (TTL: 1 hour)
ombaro:profile:customer:{user_id}      → Customer profile cache (TTL: 5 minutes)
ombaro:profile:therapist:{user_id}     → Therapist profile cache (TTL: 5 minutes)
ombaro:profile:vendor:{user_id}        → Vendor profile cache (TTL: 5 minutes)
ombaro:booking:{booking_id}            → Booking details (TTL: 1 hour)
ombaro:vendor:detail:{vendor_id}       → Vendor details cache (TTL: 10 minutes)
ombaro:vendors:{lat}:{lng}:{type}:{r}  → Vendor search results (TTL: 5 minutes)
ombaro:location:therapist:{id}         → Therapist GPS location (TTL: 5 minutes)
ombaro:attendance:{user_id}:{date}     → Attendance records (TTL: 24 hours)
ombaro:ratelimit:{ip}:{endpoint}       → Rate limiting counters (TTL: 1 minute)
```

## Use Cases

### 1. OTP Management

**Purpose**: Store and verify OTP codes for authentication

**Implementation**:
```python
# Store OTP
await redis_client.set(
    f"ombaro:otp:{mobile}",
    otp_code,
    expire=300  # 5 minutes
)

# Verify OTP
stored_otp = await redis_client.get(f"ombaro:otp:{mobile}")
if stored_otp == user_otp:
    await redis_client.delete(f"ombaro:otp:{mobile}")
    # OTP valid
```

**Benefits**:
- Fast verification (< 1ms)
- Automatic expiration
- No database writes for temporary data

---

### 2. User Profile Caching

**Purpose**: Cache frequently accessed user profiles

**Implementation**:
```python
# Get with cache
cache_key = f"ombaro:profile:customer:{user_id}"
cached_profile = await redis_client.get(cache_key)

if cached_profile:
    return cached_profile

# If not in cache, get from database
profile = await db.get_profile(user_id)

# Store in cache
await redis_client.set(cache_key, profile, expire=300)  # 5 minutes
return profile
```

**Cache Invalidation**:
```python
# When profile is updated
async def update_profile(user_id, data):
    await db.update_profile(user_id, data)

    # Invalidate cache
    cache_key = f"ombaro:profile:customer:{user_id}"
    await redis_client.delete(cache_key)
```

**Benefits**:
- 10-100x faster than database queries
- Reduces database load
- Improves response times

---

### 3. Location Tracking

**Purpose**: Store real-time therapist locations

**Implementation**:
```python
# Update location
await redis_client.set(
    f"ombaro:location:therapist:{therapist_id}",
    {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "accuracy": 10,
        "timestamp": "2025-01-15T14:30:00Z"
    },
    expire=300  # 5 minutes
)

# Get location
location = await redis_client.get(
    f"ombaro:location:therapist:{therapist_id}"
)
```

**Benefits**:
- Real-time updates
- No database writes for frequent updates
- Automatic cleanup of stale data

---

### 4. Search Results Caching

**Purpose**: Cache vendor search results by location

**Implementation**:
```python
# Cache key includes location and filters
cache_key = f"ombaro:vendors:{lat}:{lng}:{service_type}:{radius}"
cached_results = await redis_client.get(cache_key)

if cached_results:
    return cached_results

# Get from database
vendors = await db.search_vendors(lat, lng, service_type, radius)

# Cache for 5 minutes
await redis_client.set(cache_key, vendors, expire=300)
return vendors
```

**Benefits**:
- Instant search results for repeated queries
- Reduces complex database queries
- Better user experience

---

### 5. Session Management

**Purpose**: Store user session data

**Implementation**:
```python
# Store session
await redis_client.set_hash(
    f"ombaro:session:{session_id}",
    {
        "user_id": user_id,
        "role": role,
        "login_time": datetime.now().isoformat(),
        "ip_address": ip
    },
    expire=3600  # 1 hour
)

# Get session
session = await redis_client.get_hash(
    f"ombaro:session:{session_id}"
)
```

**Benefits**:
- Fast session lookup
- Automatic session expiration
- Stateless authentication

---

### 6. Rate Limiting

**Purpose**: Prevent API abuse

**Implementation**:
```python
# Check rate limit
key = f"ombaro:ratelimit:{ip}:{endpoint}"
count = await redis_client.increment(key)

if count == 1:
    # First request, set expiration
    await redis_client.redis.expire(key, 60)  # 1 minute

if count > MAX_REQUESTS:
    raise HTTPException(status_code=429, detail="Too many requests")
```

**Benefits**:
- Protects against abuse
- Minimal overhead
- Per-user/IP limits

---

### 7. Booking Queue

**Purpose**: Handle concurrent booking requests

**Implementation**:
```python
# Lock booking slot
lock_key = f"ombaro:booking:lock:{vendor_id}:{date}:{time}"
acquired = await redis_client.set(
    lock_key,
    user_id,
    expire=30,
    nx=True  # Only set if not exists
)

if not acquired:
    raise HTTPException(status_code=409, detail="Slot already booked")

# Process booking
booking = await create_booking(...)

# Release lock
await redis_client.delete(lock_key)
```

**Benefits**:
- Prevents double booking
- Atomic operations
- No database locks needed

---

## Implementation Details

### Redis Client Class

Located in `backend/app/core/redis_client.py`:

```python
class RedisClient:
    async def connect(self):
        """Connect to Redis on application startup"""

    async def disconnect(self):
        """Close Redis connection on shutdown"""

    async def get(self, key: str) -> Any:
        """Get value from Redis (auto-deserializes JSON)"""

    async def set(self, key: str, value: Any, expire: int = 3600) -> bool:
        """Set value in Redis (auto-serializes JSON)"""

    async def delete(self, key: str) -> bool:
        """Delete key from Redis"""

    async def exists(self, key: str) -> bool:
        """Check if key exists"""

    async def set_hash(self, key: str, mapping: dict, expire: int = 3600):
        """Set hash map in Redis"""

    async def get_hash(self, key: str) -> dict:
        """Get hash map from Redis"""

    async def increment(self, key: str, amount: int = 1) -> int:
        """Increment counter atomically"""
```

### Usage in Endpoints

```python
from app.core.redis_client import redis_client

@router.get("/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    # Try cache first
    cache_key = f"ombaro:profile:{current_user['role']}:{current_user['user_id']}"
    cached = await redis_client.get(cache_key)

    if cached:
        return cached

    # Get from database
    profile = await fetch_from_db(current_user['user_id'])

    # Store in cache
    await redis_client.set(cache_key, profile, expire=300)

    return profile
```

## Best Practices

### 1. Key Naming Convention

✅ **Good:**
```
ombaro:resource:type:identifier
ombaro:profile:customer:123
ombaro:booking:456
```

❌ **Bad:**
```
customer_profile_123
booking456
user-data-789
```

### 2. Set Appropriate TTLs

```python
# Short-lived data (OTP, temporary locks)
expire=300  # 5 minutes

# Medium-lived data (cache, sessions)
expire=3600  # 1 hour

# Long-lived data (user preferences)
expire=86400  # 24 hours
```

### 3. Cache Invalidation

Always invalidate cache when data changes:

```python
async def update_user(user_id, data):
    # Update database
    await db.update(user_id, data)

    # Invalidate ALL related caches
    await redis_client.delete(f"ombaro:profile:customer:{user_id}")
    await redis_client.delete(f"ombaro:user:{user_id}")
```

### 4. Handle Redis Failures Gracefully

```python
try:
    cached = await redis_client.get(key)
    if cached:
        return cached
except Exception as e:
    logger.error(f"Redis error: {e}")
    # Fall through to database query

# Always have database fallback
return await db.query(...)
```

### 5. Use Pipelines for Bulk Operations

```python
# Instead of multiple individual calls
for user_id in user_ids:
    await redis_client.delete(f"ombaro:profile:{user_id}")

# Use pipeline
pipeline = redis_client.redis.pipeline()
for user_id in user_ids:
    pipeline.delete(f"ombaro:profile:{user_id}")
await pipeline.execute()
```

### 6. Monitor Memory Usage

```python
# Set max memory in redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru  # Evict least recently used keys
```

### 7. Use Connection Pooling

Already configured in `redis_client.py`:
```python
redis = await redis.from_url(
    settings.REDIS_URL,
    max_connections=20,  # Connection pool size
    encoding="utf-8",
    decode_responses=True
)
```

## Monitoring & Troubleshooting

### Redis CLI Commands

```bash
# Connect to Redis
redis-cli

# Check connection
PING

# View all keys
KEYS ombaro:*

# Get key value
GET ombaro:otp:+919876543210

# Check key TTL
TTL ombaro:otp:+919876543210

# View memory usage
INFO memory

# View connected clients
CLIENT LIST

# Monitor real-time commands
MONITOR

# Clear all keys (DANGEROUS - use only in dev)
FLUSHDB
```

### Performance Metrics

Monitor these metrics in production:

1. **Hit Rate**: Cache hits / Total requests (target: > 80%)
2. **Memory Usage**: Keep < 80% of max memory
3. **Eviction Rate**: Should be low (< 1%)
4. **Latency**: P99 should be < 1ms
5. **Connection Count**: Should be stable

### Common Issues

#### Issue: Redis Connection Failed

**Solution:**
```bash
# Check if Redis is running
sudo systemctl status redis-server

# Restart Redis
sudo systemctl restart redis-server

# Check logs
sudo journalctl -u redis-server -f
```

#### Issue: Out of Memory

**Solution:**
```bash
# Check memory usage
redis-cli INFO memory

# Increase maxmemory in /etc/redis/redis.conf
maxmemory 4gb

# Restart Redis
sudo systemctl restart redis-server
```

#### Issue: Slow Queries

**Solution:**
```bash
# Enable slow log
redis-cli CONFIG SET slowlog-log-slower-than 10000  # 10ms

# View slow queries
redis-cli SLOWLOG GET 10
```

## Redis in Different Environments

### Development
```bash
# Local Redis without authentication
REDIS_URL=redis://localhost:6379/0
```

### Staging
```bash
# Redis with authentication
REDIS_URL=redis://default:password@staging-redis:6379/0
```

### Production
```bash
# Managed Redis with SSL
REDIS_URL=rediss://default:password@prod-redis.cloud:6380/0

# Enable SSL in production
redis_client = await redis.from_url(
    settings.REDIS_URL,
    ssl=True,
    ssl_cert_reqs=None
)
```

## Role-Specific Redis Usage

### Customer
- Profile caching
- Search results caching
- Session management
- Booking queue locks

### Therapist
- Profile caching
- Location tracking
- Assignment caching
- Earnings summary caching

### Vendor
- Profile caching
- Dashboard statistics caching
- Booking list caching
- Therapist list caching

### Employee
- Profile caching
- Vendor list caching
- Attendance records
- Report caching

### Admin
- Dashboard metrics caching
- User list caching
- Revenue analytics caching
- Audit log caching

## Security Considerations

1. **Authentication**: Always use password in production
2. **Network**: Restrict Redis access to application servers only
3. **Encryption**: Use SSL/TLS for data in transit
4. **Data Sensitivity**: Don't cache highly sensitive data (passwords, payment info)
5. **TTL**: Always set expiration for cached data

## Backup Strategy

```bash
# Enable RDB snapshots in redis.conf
save 900 1      # Save if 1 key changed in 15 minutes
save 300 10     # Save if 10 keys changed in 5 minutes
save 60 10000   # Save if 10000 keys changed in 1 minute

# Manual backup
redis-cli BGSAVE

# Backup file location
/var/lib/redis/dump.rdb
```

## Resources

- Redis Documentation: https://redis.io/docs/
- Redis Python Client: https://redis-py.readthedocs.io/
- Redis Best Practices: https://redis.io/docs/manual/patterns/
- Redis University: https://university.redis.com/

## Support

For Redis-related issues:
- Check logs: `sudo journalctl -u redis-server -f`
- Monitor performance: `redis-cli INFO`
- Contact DevOps team: devops@ombaro.com
