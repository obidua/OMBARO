from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date, time

class ServiceItem(BaseModel):
    service_id: str
    quantity: int = 1
    price: float

class BookingCreate(BaseModel):
    vendor_id: str
    services: List[ServiceItem]
    booking_date: date
    booking_time: time
    location: dict
    special_requests: Optional[str] = None

class BookingUpdate(BaseModel):
    booking_date: Optional[date] = None
    booking_time: Optional[time] = None
    status: Optional[str] = None

class BookingResponse(BaseModel):
    id: str
    customer_id: str
    vendor_id: str
    booking_date: date
    booking_time: time
    status: str
    total_amount: float
    payment_status: str
    services: List[dict]
    location: dict
    created_at: datetime

    class Config:
        from_attributes = True

class TherapistAssignmentCreate(BaseModel):
    booking_id: str
    therapist_id: str
    services: List[str]
    assignment_time: datetime

class TherapistAssignmentUpdate(BaseModel):
    status: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    notes: Optional[str] = None
