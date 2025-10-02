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
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Get employee profile"""
    cache_key = f"profile:employee:{current_user['user_id']}"
    cached_profile = await redis_client.get(cache_key)

    if cached_profile:
        return cached_profile

    profile = {
        "id": current_user["user_id"],
        "name": "Rahul Kumar",
        "employee_id": "EMP001",
        "email": "rahul@ombaro.com",
        "mobile": "+919876543210",
        "department": "Operations",
        "designation": "Spa Coordinator",
        "joining_date": "2023-01-15",
        "status": "active"
    }

    await redis_client.set(cache_key, profile, expire=300)
    return profile

@router.get("/vendors")
async def get_vendors(
    status: Optional[str] = Query(None),
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Get list of vendors for employee management"""
    vendors = [
        {
            "id": "vendor_1",
            "business_name": "Serenity Wellness Spa",
            "owner_name": "Rajesh Kumar",
            "location": "Koramangala, Bangalore",
            "status": "active",
            "rating": 4.8,
            "onboarded_by": "You",
            "onboarding_date": "2024-05-15"
        },
        {
            "id": "vendor_2",
            "business_name": "Bliss Beauty Center",
            "owner_name": "Priya Sharma",
            "location": "Indiranagar, Bangalore",
            "status": "pending",
            "rating": 0,
            "onboarded_by": "Priya S.",
            "onboarding_date": "2024-12-20"
        }
    ]

    if status:
        vendors = [v for v in vendors if v["status"] == status]

    return {"vendors": vendors, "total": len(vendors)}

@router.get("/vendors/{vendor_id}")
async def get_vendor_detail(
    vendor_id: str,
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Get detailed vendor information"""
    vendor = {
        "id": vendor_id,
        "business_name": "Serenity Wellness Spa",
        "owner_name": "Rajesh Kumar",
        "email": "contact@serenity.com",
        "mobile": "+919876543210",
        "address": "123 Main St, Koramangala, Bangalore",
        "gst_number": "29ABCDE1234F1Z5",
        "rating": 4.8,
        "total_reviews": 256,
        "total_bookings": 1250,
        "status": "active",
        "onboarding_date": "2024-05-15",
        "documents": [
            {"type": "Business License", "status": "verified"},
            {"type": "GST Certificate", "status": "verified"}
        ]
    }

    return vendor

@router.put("/vendors/{vendor_id}/status")
async def update_vendor_status(
    vendor_id: str,
    status_data: dict,
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Approve/reject vendor application"""
    return {
        "message": "Vendor status updated",
        "vendor_id": vendor_id,
        "new_status": status_data.get("status")
    }

@router.get("/attendance")
async def get_my_attendance(
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Get employee's own attendance records"""
    attendance = [
        {
            "date": "2025-01-15",
            "check_in": "09:00",
            "check_out": "18:00",
            "status": "present",
            "working_hours": 9
        },
        {
            "date": "2025-01-14",
            "check_in": "09:15",
            "check_out": "18:00",
            "status": "present",
            "working_hours": 8.75
        }
    ]

    return {"attendance": attendance}

@router.post("/attendance/checkin")
async def checkin(
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Mark employee check-in"""
    checkin_time = datetime.now()

    await redis_client.set(
        f"attendance:{current_user['user_id']}:{checkin_time.date()}",
        {"check_in": checkin_time.isoformat()},
        expire=86400
    )

    return {
        "message": "Checked in successfully",
        "time": checkin_time.isoformat()
    }

@router.post("/attendance/checkout")
async def checkout(
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Mark employee check-out"""
    checkout_time = datetime.now()

    return {
        "message": "Checked out successfully",
        "time": checkout_time.isoformat()
    }

@router.get("/leaves")
async def get_my_leaves(
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Get employee's leave requests"""
    leaves = [
        {
            "id": "leave_1",
            "leave_type": "Casual Leave",
            "start_date": "2025-02-01",
            "end_date": "2025-02-02",
            "total_days": 2,
            "reason": "Personal work",
            "status": "approved",
            "applied_date": "2025-01-20"
        }
    ]

    return {
        "leaves": leaves,
        "balance": {"casual": 8, "sick": 12, "earned": 15}
    }

@router.post("/leaves")
async def apply_leave(
    leave_data: dict,
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Apply for leave"""
    leave_id = f"leave_{datetime.now().strftime('%Y%m%d%H%M%S')}"

    return {
        "message": "Leave request submitted",
        "leave_id": leave_id
    }

@router.get("/documents")
async def get_documents(
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Get employee documents"""
    documents = [
        {
            "id": "doc_1",
            "name": "Offer Letter",
            "type": "pdf",
            "uploaded_date": "2023-01-15",
            "url": "/documents/offer_letter.pdf"
        },
        {
            "id": "doc_2",
            "name": "ID Proof",
            "type": "pdf",
            "uploaded_date": "2023-01-15",
            "url": "/documents/id_proof.pdf"
        }
    ]

    return {"documents": documents}

@router.get("/reports")
async def get_reports(
    report_type: Optional[str] = Query(None),
    current_user: dict = Depends(require_role(["employee"])),
    db: AsyncSession = Depends(get_db)
):
    """Get various reports"""
    reports = {
        "vendor_onboarding": {
            "total": 47,
            "this_month": 5,
            "pending": 8
        },
        "bookings": {
            "total": 1250,
            "this_month": 320,
            "completed": 1100
        },
        "revenue": {
            "total": 2500000,
            "this_month": 450000
        }
    }

    return reports
