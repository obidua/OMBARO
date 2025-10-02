from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.core.redis_client import redis_client
from typing import List, Optional
from datetime import datetime, date

router = APIRouter()

@router.get("/profile")
async def get_profile(
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Get vendor/spa profile"""
    cache_key = f"profile:vendor:{current_user['user_id']}"
    cached_profile = await redis_client.get(cache_key)

    if cached_profile:
        return cached_profile

    profile = {
        "id": current_user["user_id"],
        "business_name": "Serenity Wellness Spa",
        "owner_name": "Rajesh Kumar",
        "email": "contact@serenity.com",
        "mobile": "+919876543210",
        "address": "123 Main St, Koramangala, Bangalore",
        "rating": 4.8,
        "total_reviews": 256,
        "total_bookings": 1250,
        "status": "active",
        "registration_date": "2023-05-15"
    }

    await redis_client.set(cache_key, profile, expire=300)
    return profile

@router.put("/profile")
async def update_profile(
    profile_data: dict,
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Update vendor profile"""
    cache_key = f"profile:vendor:{current_user['user_id']}"
    await redis_client.delete(cache_key)

    return {"message": "Profile updated successfully", "data": profile_data}

@router.get("/therapists")
async def get_therapists(
    status: Optional[str] = Query(None),
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Get list of therapists under this vendor"""
    therapists = [
        {
            "id": "therapist_1",
            "name": "Priya Sharma",
            "employee_id": "TH001",
            "mobile": "+919876543210",
            "email": "priya@example.com",
            "specialization": ["Swedish Massage", "Deep Tissue"],
            "experience_years": 5,
            "rating": 4.9,
            "total_reviews": 156,
            "status": "active",
            "availability_status": "available"
        },
        {
            "id": "therapist_2",
            "name": "Anjali Kumar",
            "employee_id": "TH002",
            "mobile": "+919876543211",
            "email": "anjali@example.com",
            "specialization": ["Aromatherapy", "Hot Stone"],
            "experience_years": 3,
            "rating": 4.7,
            "total_reviews": 98,
            "status": "active",
            "availability_status": "busy"
        }
    ]

    if status:
        therapists = [t for t in therapists if t["status"] == status]

    return {"therapists": therapists, "total": len(therapists)}

@router.post("/therapists")
async def add_therapist(
    therapist_data: dict,
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Add new therapist to vendor"""
    therapist_id = f"therapist_{datetime.now().strftime('%Y%m%d%H%M%S')}"

    return {
        "message": "Therapist added successfully",
        "therapist_id": therapist_id,
        "data": therapist_data
    }

@router.put("/therapists/{therapist_id}")
async def update_therapist(
    therapist_id: str,
    therapist_data: dict,
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Update therapist details"""
    return {
        "message": "Therapist updated successfully",
        "therapist_id": therapist_id
    }

@router.delete("/therapists/{therapist_id}")
async def delete_therapist(
    therapist_id: str,
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Deactivate/remove therapist"""
    return {"message": "Therapist removed successfully"}

@router.get("/services")
async def get_services(
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Get vendor's service catalog"""
    services = [
        {
            "id": "service_1",
            "name": "Swedish Massage",
            "category": "Massage",
            "duration": 60,
            "price": 2000,
            "description": "Relaxing full body massage",
            "status": "active"
        },
        {
            "id": "service_2",
            "name": "Deep Tissue Massage",
            "category": "Massage",
            "duration": 90,
            "price": 3000,
            "description": "Intense therapeutic massage",
            "status": "active"
        },
        {
            "id": "service_3",
            "name": "Aromatherapy",
            "category": "Therapy",
            "duration": 60,
            "price": 2500,
            "description": "Essential oil massage therapy",
            "status": "active"
        }
    ]

    return {"services": services, "total": len(services)}

@router.post("/services")
async def add_service(
    service_data: dict,
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Add new service to catalog"""
    service_id = f"service_{datetime.now().strftime('%Y%m%d%H%M%S')}"

    return {
        "message": "Service added successfully",
        "service_id": service_id
    }

@router.put("/services/{service_id}")
async def update_service(
    service_id: str,
    service_data: dict,
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Update service details"""
    return {"message": "Service updated successfully"}

@router.delete("/services/{service_id}")
async def delete_service(
    service_id: str,
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Remove service from catalog"""
    return {"message": "Service removed successfully"}

@router.get("/bookings")
async def get_bookings(
    status: Optional[str] = Query(None),
    date: Optional[date] = Query(None),
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Get bookings for this vendor"""
    bookings = [
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
        },
        {
            "id": "booking_2",
            "customer_name": "Jane Smith",
            "customer_phone": "+919876543211",
            "booking_date": "2025-01-16",
            "booking_time": "16:00",
            "services": ["Deep Tissue Massage"],
            "therapist": "Anjali Kumar",
            "total_amount": 3000,
            "status": "pending",
            "payment_status": "pending"
        }
    ]

    if status:
        bookings = [b for b in bookings if b["status"] == status]
    if date:
        bookings = [b for b in bookings if b["booking_date"] == str(date)]

    return {"bookings": bookings, "total": len(bookings)}

@router.get("/bookings/{booking_id}")
async def get_booking_detail(
    booking_id: str,
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Get detailed booking information"""
    booking = {
        "id": booking_id,
        "customer": {
            "name": "John Doe",
            "phone": "+919876543210",
            "address": "123 Main St, Bangalore"
        },
        "booking_date": "2025-01-15",
        "booking_time": "14:00",
        "services": [
            {"name": "Swedish Massage", "duration": 60, "price": 2000}
        ],
        "therapist": {
            "id": "therapist_1",
            "name": "Priya Sharma",
            "phone": "+919876543210"
        },
        "total_amount": 2000,
        "commission": 200,
        "net_amount": 1800,
        "status": "confirmed",
        "payment_status": "paid",
        "special_requests": "Prefer light pressure"
    }

    return booking

@router.post("/bookings/{booking_id}/assign")
async def assign_therapist(
    booking_id: str,
    assignment_data: dict,
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Assign therapist to booking"""
    return {
        "message": "Therapist assigned successfully",
        "booking_id": booking_id,
        "therapist_id": assignment_data.get("therapist_id")
    }

@router.get("/dashboard")
async def get_dashboard(
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Get vendor dashboard statistics"""
    dashboard = {
        "today_bookings": 12,
        "pending_bookings": 5,
        "total_revenue": 125000,
        "monthly_revenue": 45000,
        "active_therapists": 8,
        "total_customers": 350,
        "average_rating": 4.8,
        "recent_bookings": [
            {
                "id": "booking_1",
                "customer_name": "John Doe",
                "service": "Swedish Massage",
                "time": "14:00",
                "status": "confirmed"
            }
        ]
    }

    return dashboard

@router.get("/revenue")
async def get_revenue(
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Get revenue analytics"""
    revenue = {
        "total_revenue": 125000,
        "current_month": 45000,
        "last_month": 38000,
        "growth_percentage": 18.4,
        "breakdown": {
            "services": 100000,
            "products": 15000,
            "packages": 10000
        },
        "transactions": [
            {
                "date": "2025-01-15",
                "booking_id": "booking_1",
                "amount": 2000,
                "commission": 200,
                "net_amount": 1800,
                "status": "completed"
            }
        ]
    }

    return revenue

@router.get("/attendance")
async def get_attendance(
    date: Optional[date] = Query(None),
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Get therapist attendance records"""
    attendance = [
        {
            "therapist_id": "therapist_1",
            "therapist_name": "Priya Sharma",
            "date": "2025-01-15",
            "check_in": "09:00",
            "check_out": "18:00",
            "status": "present",
            "working_hours": 9
        },
        {
            "therapist_id": "therapist_2",
            "therapist_name": "Anjali Kumar",
            "date": "2025-01-15",
            "check_in": "09:30",
            "check_out": "17:30",
            "status": "present",
            "working_hours": 8
        }
    ]

    return {"attendance": attendance, "date": date or datetime.now().date()}

@router.get("/reviews")
async def get_reviews(
    current_user: dict = Depends(require_role(["vendor"])),
    db: AsyncSession = Depends(get_db)
):
    """Get customer reviews for vendor"""
    reviews = [
        {
            "id": "review_1",
            "customer_name": "Sarah Johnson",
            "rating": 5,
            "comment": "Excellent spa experience!",
            "service": "Swedish Massage",
            "therapist": "Priya Sharma",
            "date": "2025-01-25"
        },
        {
            "id": "review_2",
            "customer_name": "Mike Brown",
            "rating": 4,
            "comment": "Great service, very professional.",
            "service": "Deep Tissue Massage",
            "therapist": "Anjali Kumar",
            "date": "2025-01-23"
        }
    ]

    return {
        "reviews": reviews,
        "average_rating": 4.8,
        "total_reviews": 256
    }
