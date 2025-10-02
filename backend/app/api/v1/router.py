from fastapi import APIRouter
from app.api.v1.endpoints import auth, customer, therapist, vendor, employee, admin

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(customer.router, prefix="/customer", tags=["Customer"])
api_router.include_router(therapist.router, prefix="/therapist", tags=["Therapist"])
api_router.include_router(vendor.router, prefix="/vendor", tags=["Vendor"])
api_router.include_router(employee.router, prefix="/employee", tags=["Employee"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
