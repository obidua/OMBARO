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
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Get therapist profile"""
    cache_key = f"profile:therapist:{current_user['user_id']}"
    cached_profile = await redis_client.get(cache_key)

    if cached_profile:
        return cached_profile

    profile = {
        "id": current_user["user_id"],
        "name": "Priya Sharma",
        "email": "priya@example.com",
        "mobile": "+919876543210",
        "employee_id": "TH001",
        "vendor_id": "vendor_1",
        "specialization": ["Swedish Massage", "Deep Tissue", "Aromatherapy"],
        "experience_years": 5,
        "certification": ["Certified Massage Therapist", "Aromatherapy Specialist"],
        "rating": 4.8,
        "total_reviews": 156,
        "status": "active",
        "availability_status": "available"
    }

    await redis_client.set(cache_key, profile, expire=300)
    return profile

@router.put("/profile")
async def update_profile(
    profile_data: dict,
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Update therapist profile"""
    cache_key = f"profile:therapist:{current_user['user_id']}"
    await redis_client.delete(cache_key)

    return {"message": "Profile updated successfully", "data": profile_data}

@router.get("/assignments")
async def get_assignments(
    status: Optional[str] = Query(None),
    date: Optional[date] = Query(None),
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """
    Get therapist assignments
    - Filter by status (assigned, in_progress, completed, cancelled)
    - Filter by date
    """
    assignments = [
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
        },
        {
            "id": "assignment_2",
            "booking_id": "booking_2",
            "customer_name": "Jane Smith",
            "customer_phone": "+919876543211",
            "service_name": "Deep Tissue Massage",
            "duration": 90,
            "assignment_date": "2025-01-16",
            "assignment_time": "16:00",
            "location": {
                "address": "456 Park Ave, Bangalore",
                "latitude": 12.9716,
                "longitude": 77.5946
            },
            "status": "in_progress",
            "payment_amount": 3000
        }
    ]

    if status:
        assignments = [a for a in assignments if a["status"] == status]
    if date:
        assignments = [a for a in assignments if a["assignment_date"] == str(date)]

    return {"assignments": assignments, "total": len(assignments)}

@router.get("/assignments/{assignment_id}")
async def get_assignment_detail(
    assignment_id: str,
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Get detailed assignment information"""
    assignment = {
        "id": assignment_id,
        "booking_id": "booking_1",
        "customer": {
            "name": "John Doe",
            "phone": "+919876543210",
            "rating": 4.8
        },
        "service": {
            "name": "Swedish Massage",
            "duration": 60,
            "special_requests": "Prefer light pressure"
        },
        "assignment_date": "2025-01-15",
        "assignment_time": "14:00",
        "location": {
            "address": "123 Main St, Bangalore",
            "latitude": 12.9716,
            "longitude": 77.5946
        },
        "status": "assigned",
        "payment_amount": 2000,
        "commission": 200,
        "net_earning": 1800
    }

    return assignment

@router.put("/assignments/{assignment_id}/status")
async def update_assignment_status(
    assignment_id: str,
    status_data: dict,
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """
    Update assignment status
    - Start assignment (assigned -> in_progress)
    - Complete assignment (in_progress -> completed)
    - Cancel assignment
    """
    return {
        "message": "Assignment status updated",
        "assignment_id": assignment_id,
        "new_status": status_data.get("status")
    }

@router.get("/schedule")
async def get_schedule(
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Get therapist schedule"""
    schedule = {
        "monday": {"start_time": "09:00", "end_time": "18:00", "is_available": True},
        "tuesday": {"start_time": "09:00", "end_time": "18:00", "is_available": True},
        "wednesday": {"start_time": "09:00", "end_time": "18:00", "is_available": True},
        "thursday": {"start_time": "09:00", "end_time": "18:00", "is_available": True},
        "friday": {"start_time": "09:00", "end_time": "18:00", "is_available": True},
        "saturday": {"start_time": "10:00", "end_time": "16:00", "is_available": True},
        "sunday": {"start_time": "", "end_time": "", "is_available": False}
    }

    return {"schedule": schedule}

@router.put("/schedule")
async def update_schedule(
    schedule_data: dict,
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Update therapist schedule"""
    return {"message": "Schedule updated successfully", "schedule": schedule_data}

@router.get("/leaves")
async def get_leaves(
    status: Optional[str] = Query(None),
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Get leave requests"""
    leaves = [
        {
            "id": "leave_1",
            "leave_type": "Sick Leave",
            "start_date": "2025-01-20",
            "end_date": "2025-01-22",
            "total_days": 3,
            "reason": "Flu and fever",
            "status": "approved",
            "applied_date": "2025-01-15"
        },
        {
            "id": "leave_2",
            "leave_type": "Casual Leave",
            "start_date": "2025-02-05",
            "end_date": "2025-02-06",
            "total_days": 2,
            "reason": "Personal work",
            "status": "pending",
            "applied_date": "2025-01-25"
        }
    ]

    if status:
        leaves = [l for l in leaves if l["status"] == status]

    return {"leaves": leaves, "balance": {"casual": 8, "sick": 12, "earned": 15}}

@router.post("/leaves")
async def apply_leave(
    leave_data: dict,
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Apply for leave"""
    leave_id = f"leave_{datetime.now().strftime('%Y%m%d%H%M%S')}"

    return {
        "message": "Leave request submitted successfully",
        "leave_id": leave_id,
        "status": "pending"
    }

@router.get("/earnings")
async def get_earnings(
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Get earnings summary and transactions"""
    earnings = {
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
            },
            {
                "id": "txn_2",
                "booking_id": "booking_2",
                "customer_name": "Jane Smith",
                "service_name": "Deep Tissue Massage",
                "date": "2025-01-16",
                "amount": 3000,
                "commission": 300,
                "net_amount": 2700,
                "status": "pending"
            }
        ]
    }

    return earnings

@router.get("/performance")
async def get_performance(
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Get performance metrics and reviews"""
    performance = {
        "total_assignments": 145,
        "completed_assignments": 142,
        "cancelled_assignments": 3,
        "completion_rate": 97.9,
        "average_rating": 4.8,
        "total_reviews": 156,
        "customer_satisfaction": 96,
        "recent_reviews": [
            {
                "id": "review_1",
                "customer_name": "Sarah Johnson",
                "rating": 5,
                "comment": "Excellent service! Very professional.",
                "date": "2025-01-25"
            },
            {
                "id": "review_2",
                "customer_name": "Mike Brown",
                "rating": 5,
                "comment": "Best massage ever!",
                "date": "2025-01-23"
            }
        ]
    }

    return performance

@router.post("/location")
async def update_location(
    location_data: dict,
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Update therapist current location"""
    await redis_client.set(
        f"location:therapist:{current_user['user_id']}",
        location_data,
        expire=300
    )

    return {"message": "Location updated successfully"}

@router.get("/location")
async def get_location(
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Get therapist current location"""
    location = await redis_client.get(f"location:therapist:{current_user['user_id']}")

    if not location:
        return {"message": "No location data available"}

    return location

@router.put("/availability")
async def update_availability(
    availability_data: dict,
    current_user: dict = Depends(require_role(["therapist"])),
    db: AsyncSession = Depends(get_db)
):
    """Update availability status (available, busy, offline)"""
    cache_key = f"profile:therapist:{current_user['user_id']}"
    await redis_client.delete(cache_key)

    return {
        "message": "Availability updated",
        "status": availability_data.get("status")
    }
