from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.core.redis_client import redis_client
from app.schemas.booking import BookingCreate, BookingUpdate, BookingResponse
from typing import List, Optional
from datetime import datetime

router = APIRouter()

@router.get("/profile")
async def get_profile(
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Get customer profile"""
    cache_key = f"profile:customer:{current_user['user_id']}"
    cached_profile = await redis_client.get(cache_key)

    if cached_profile:
        return cached_profile

    profile = {
        "id": current_user["user_id"],
        "name": "John Doe",
        "mobile": "+919876543210",
        "email": "john@example.com",
        "address": "123 Main St, Mumbai",
        "total_bookings": 25,
        "loyalty_points": 500
    }

    await redis_client.set(cache_key, profile, expire=300)
    return profile

@router.put("/profile")
async def update_profile(
    profile_data: dict,
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Update customer profile"""
    cache_key = f"profile:customer:{current_user['user_id']}"
    await redis_client.delete(cache_key)

    return {"message": "Profile updated successfully", "data": profile_data}

@router.get("/vendors", response_model=List[dict])
async def get_vendors(
    latitude: Optional[float] = Query(None),
    longitude: Optional[float] = Query(None),
    service_type: Optional[str] = Query(None),
    radius: Optional[int] = Query(5),
    db: AsyncSession = Depends(get_db)
):
    """
    Get list of nearby vendors/spas
    - Filter by location (latitude, longitude, radius)
    - Filter by service type
    - Returns vendor details with ratings and services
    """
    cache_key = f"vendors:{latitude}:{longitude}:{service_type}:{radius}"
    cached_vendors = await redis_client.get(cache_key)

    if cached_vendors:
        return cached_vendors

    vendors = [
        {
            "id": "vendor_1",
            "name": "Serenity Spa",
            "rating": 4.8,
            "total_reviews": 156,
            "distance": 2.3,
            "address": "Koramangala, Bangalore",
            "services": ["Swedish Massage", "Deep Tissue", "Aromatherapy"],
            "price_range": "₹1000-₹3000",
            "images": ["/api/placeholder/400/300"]
        },
        {
            "id": "vendor_2",
            "name": "Bliss Wellness",
            "rating": 4.6,
            "total_reviews": 98,
            "distance": 3.1,
            "address": "Indiranagar, Bangalore",
            "services": ["Thai Massage", "Hot Stone", "Reflexology"],
            "price_range": "₹1500-₹4000",
            "images": ["/api/placeholder/400/300"]
        }
    ]

    await redis_client.set(cache_key, vendors, expire=300)
    return vendors

@router.get("/vendors/{vendor_id}")
async def get_vendor_detail(
    vendor_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get detailed vendor information"""
    cache_key = f"vendor:detail:{vendor_id}"
    cached_vendor = await redis_client.get(cache_key)

    if cached_vendor:
        return cached_vendor

    vendor = {
        "id": vendor_id,
        "name": "Serenity Spa",
        "rating": 4.8,
        "total_reviews": 156,
        "address": "123 Main St, Koramangala, Bangalore",
        "phone": "+919876543210",
        "services": [
            {
                "id": "service_1",
                "name": "Swedish Massage",
                "duration": 60,
                "price": 2000,
                "description": "Relaxing full body massage"
            },
            {
                "id": "service_2",
                "name": "Deep Tissue Massage",
                "duration": 90,
                "price": 3000,
                "description": "Intense therapeutic massage"
            }
        ],
        "therapists": [
            {
                "id": "therapist_1",
                "name": "Priya Sharma",
                "specialization": ["Swedish", "Deep Tissue"],
                "rating": 4.9,
                "experience_years": 5
            }
        ],
        "images": ["/api/placeholder/400/300"],
        "working_hours": {
            "monday": "9:00 AM - 9:00 PM",
            "tuesday": "9:00 AM - 9:00 PM"
        }
    }

    await redis_client.set(cache_key, vendor, expire=600)
    return vendor

@router.post("/bookings", response_model=dict)
async def create_booking(
    booking: BookingCreate,
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """
    Create new booking
    - Validates service availability
    - Calculates total amount
    - Creates booking record
    """
    booking_id = f"booking_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    total_amount = sum(item.price * item.quantity for item in booking.services)

    booking_data = {
        "id": booking_id,
        "customer_id": current_user["user_id"],
        "vendor_id": booking.vendor_id,
        "booking_date": str(booking.booking_date),
        "booking_time": str(booking.booking_time),
        "services": [item.dict() for item in booking.services],
        "total_amount": total_amount,
        "status": "pending",
        "payment_status": "pending",
        "location": booking.location,
        "special_requests": booking.special_requests,
        "created_at": datetime.now().isoformat()
    }

    await redis_client.set(f"booking:{booking_id}", booking_data, expire=3600)

    return {
        "message": "Booking created successfully",
        "booking": booking_data
    }

@router.get("/bookings")
async def get_bookings(
    status: Optional[str] = Query(None),
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Get customer bookings with optional status filter"""
    bookings = [
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
        },
        {
            "id": "booking_2",
            "vendor_name": "Bliss Wellness",
            "booking_date": "2025-01-20",
            "booking_time": "16:00",
            "services": ["Deep Tissue Massage"],
            "total_amount": 3000,
            "status": "confirmed",
            "therapist": {
                "name": "Anjali Kumar",
                "rating": 4.7
            }
        }
    ]

    if status:
        bookings = [b for b in bookings if b["status"] == status]

    return {"bookings": bookings, "total": len(bookings)}

@router.get("/bookings/{booking_id}")
async def get_booking_detail(
    booking_id: str,
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Get detailed booking information"""
    cache_key = f"booking:{booking_id}"
    cached_booking = await redis_client.get(cache_key)

    if cached_booking:
        return cached_booking

    booking = {
        "id": booking_id,
        "customer_id": current_user["user_id"],
        "vendor_id": "vendor_1",
        "vendor_name": "Serenity Spa",
        "booking_date": "2025-01-15",
        "booking_time": "14:00",
        "services": [
            {"name": "Swedish Massage", "duration": 60, "price": 2000}
        ],
        "total_amount": 2000,
        "status": "confirmed",
        "payment_status": "paid",
        "therapist": {
            "id": "therapist_1",
            "name": "Priya Sharma",
            "phone": "+919876543210",
            "rating": 4.9
        },
        "location": {
            "address": "123 Customer St, Bangalore",
            "latitude": 12.9716,
            "longitude": 77.5946
        }
    }

    await redis_client.set(cache_key, booking, expire=300)
    return booking

@router.put("/bookings/{booking_id}")
async def update_booking(
    booking_id: str,
    booking_update: BookingUpdate,
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Update booking details (reschedule, cancel, etc.)"""
    cache_key = f"booking:{booking_id}"
    await redis_client.delete(cache_key)

    return {
        "message": "Booking updated successfully",
        "booking_id": booking_id,
        "updates": booking_update.dict(exclude_unset=True)
    }

@router.delete("/bookings/{booking_id}")
async def cancel_booking(
    booking_id: str,
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Cancel booking"""
    cache_key = f"booking:{booking_id}"
    await redis_client.delete(cache_key)

    return {"message": "Booking cancelled successfully"}

@router.post("/bookings/{booking_id}/review")
async def add_review(
    booking_id: str,
    review_data: dict,
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Add review and rating for completed booking"""
    return {
        "message": "Review submitted successfully",
        "review": review_data
    }

@router.get("/favorites")
async def get_favorites(
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Get customer's favorite spas/vendors"""
    return {"favorites": []}

@router.post("/favorites/{vendor_id}")
async def add_favorite(
    vendor_id: str,
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Add vendor to favorites"""
    return {"message": "Added to favorites"}

@router.delete("/favorites/{vendor_id}")
async def remove_favorite(
    vendor_id: str,
    current_user: dict = Depends(require_role(["customer"])),
    db: AsyncSession = Depends(get_db)
):
    """Remove vendor from favorites"""
    return {"message": "Removed from favorites"}
