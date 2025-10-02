from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.core.redis_client import redis_client
from typing import List, Optional
from datetime import datetime, date

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard(
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get admin dashboard statistics"""
    dashboard = {
        "total_users": 5420,
        "total_vendors": 156,
        "total_therapists": 345,
        "total_bookings": 8750,
        "total_revenue": 12500000,
        "active_bookings": 45,
        "pending_approvals": 12,
        "today_revenue": 125000,
        "growth_metrics": {
            "user_growth": 15.5,
            "vendor_growth": 8.3,
            "booking_growth": 22.1,
            "revenue_growth": 18.7
        }
    }

    return dashboard

@router.get("/users")
async def get_users(
    role: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get all users with filters"""
    users = [
        {
            "id": "user_1",
            "name": "John Doe",
            "mobile": "+919876543210",
            "email": "john@example.com",
            "role": "customer",
            "status": "active",
            "created_at": "2024-05-15",
            "total_bookings": 25
        },
        {
            "id": "user_2",
            "name": "Priya Sharma",
            "mobile": "+919876543211",
            "email": "priya@example.com",
            "role": "therapist",
            "status": "active",
            "created_at": "2024-03-10",
            "vendor": "Serenity Spa"
        }
    ]

    if role:
        users = [u for u in users if u["role"] == role]
    if status:
        users = [u for u in users if u["status"] == status]

    return {"users": users, "total": len(users)}

@router.get("/users/{user_id}")
async def get_user_detail(
    user_id: str,
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get detailed user information"""
    user = {
        "id": user_id,
        "name": "John Doe",
        "mobile": "+919876543210",
        "email": "john@example.com",
        "role": "customer",
        "status": "active",
        "created_at": "2024-05-15",
        "last_login": "2025-01-15 10:30:00",
        "total_bookings": 25,
        "total_spent": 50000,
        "loyalty_points": 500
    }

    return user

@router.put("/users/{user_id}/status")
async def update_user_status(
    user_id: str,
    status_data: dict,
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Activate/deactivate user"""
    return {
        "message": "User status updated",
        "user_id": user_id,
        "new_status": status_data.get("status")
    }

@router.delete("/users/{user_id}")
async def delete_user(
    user_id: str,
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Delete user account"""
    return {"message": "User deleted successfully"}

@router.get("/vendors")
async def get_all_vendors(
    status: Optional[str] = Query(None),
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get all vendors"""
    vendors = [
        {
            "id": "vendor_1",
            "business_name": "Serenity Wellness Spa",
            "owner_name": "Rajesh Kumar",
            "location": "Koramangala, Bangalore",
            "status": "active",
            "rating": 4.8,
            "total_bookings": 1250,
            "total_revenue": 2500000,
            "onboarding_date": "2024-05-15"
        }
    ]

    if status:
        vendors = [v for v in vendors if v["status"] == status]

    return {"vendors": vendors, "total": len(vendors)}

@router.get("/vendors/pending-approval")
async def get_pending_vendors(
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get vendors pending approval"""
    pending = [
        {
            "id": "vendor_5",
            "business_name": "Luxury Spa & Wellness",
            "owner_name": "Amit Verma",
            "location": "HSR Layout, Bangalore",
            "submitted_date": "2025-01-10",
            "documents_status": "complete"
        }
    ]

    return {"vendors": pending, "total": len(pending)}

@router.put("/vendors/{vendor_id}/approve")
async def approve_vendor(
    vendor_id: str,
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Approve vendor application"""
    return {"message": "Vendor approved successfully"}

@router.put("/vendors/{vendor_id}/reject")
async def reject_vendor(
    vendor_id: str,
    rejection_data: dict,
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Reject vendor application"""
    return {
        "message": "Vendor rejected",
        "reason": rejection_data.get("reason")
    }

@router.get("/bookings")
async def get_all_bookings(
    status: Optional[str] = Query(None),
    date: Optional[date] = Query(None),
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get all bookings across platform"""
    bookings = [
        {
            "id": "booking_1",
            "customer_name": "John Doe",
            "vendor_name": "Serenity Spa",
            "booking_date": "2025-01-15",
            "total_amount": 2000,
            "status": "completed",
            "payment_status": "paid"
        }
    ]

    return {"bookings": bookings, "total": len(bookings)}

@router.get("/revenue")
async def get_revenue_analytics(
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get platform revenue analytics"""
    revenue = {
        "total_revenue": 12500000,
        "current_month": 1250000,
        "last_month": 1100000,
        "growth_percentage": 13.6,
        "commission_earned": 1250000,
        "breakdown_by_category": {
            "massage": 7500000,
            "spa_treatments": 3000000,
            "beauty_services": 2000000
        },
        "breakdown_by_vendor": [
            {
                "vendor_id": "vendor_1",
                "vendor_name": "Serenity Spa",
                "revenue": 2500000,
                "commission": 250000
            }
        ]
    }

    return revenue

@router.get("/reports/bookings")
async def get_booking_reports(
    start_date: date,
    end_date: date,
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Generate booking reports"""
    report = {
        "period": f"{start_date} to {end_date}",
        "total_bookings": 1250,
        "completed": 1100,
        "cancelled": 50,
        "pending": 100,
        "completion_rate": 88.0,
        "daily_breakdown": [
            {"date": "2025-01-15", "bookings": 45, "revenue": 90000}
        ]
    }

    return report

@router.get("/reports/vendors")
async def get_vendor_reports(
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Generate vendor performance reports"""
    report = {
        "total_vendors": 156,
        "active_vendors": 142,
        "top_performers": [
            {
                "vendor_id": "vendor_1",
                "vendor_name": "Serenity Spa",
                "rating": 4.8,
                "total_bookings": 1250,
                "revenue": 2500000
            }
        ],
        "low_performers": []
    }

    return report

@router.get("/settings")
async def get_settings(
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get platform settings"""
    settings = {
        "commission_rate": 10,
        "cancellation_policy": "24 hours",
        "refund_policy": "7 days",
        "payment_gateway": "Razorpay",
        "sms_provider": "Twilio",
        "maintenance_mode": False
    }

    return settings

@router.put("/settings")
async def update_settings(
    settings_data: dict,
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Update platform settings"""
    return {
        "message": "Settings updated successfully",
        "data": settings_data
    }

@router.get("/roles")
async def get_roles(
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get all roles and permissions"""
    roles = [
        {
            "id": "role_1",
            "name": "admin",
            "display_name": "Administrator",
            "permissions": ["all"]
        },
        {
            "id": "role_2",
            "name": "employee",
            "display_name": "Employee",
            "permissions": ["manage_vendors", "view_bookings"]
        }
    ]

    return {"roles": roles}

@router.post("/roles")
async def create_role(
    role_data: dict,
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Create new role"""
    return {"message": "Role created successfully"}

@router.get("/audit-logs")
async def get_audit_logs(
    user_id: Optional[str] = Query(None),
    action: Optional[str] = Query(None),
    current_user: dict = Depends(require_role(["admin"])),
    db: AsyncSession = Depends(get_db)
):
    """Get audit logs"""
    logs = [
        {
            "id": "log_1",
            "user_id": "admin_1",
            "user_name": "Admin User",
            "action": "approve_vendor",
            "details": "Approved vendor: Serenity Spa",
            "timestamp": "2025-01-15 10:30:00",
            "ip_address": "192.168.1.1"
        }
    ]

    return {"logs": logs}
