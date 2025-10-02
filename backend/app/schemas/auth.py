from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class OTPRequest(BaseModel):
    mobile: str = Field(..., pattern=r"^\+?[1-9]\d{9,14}$")

class OTPVerify(BaseModel):
    mobile: str
    otp: str = Field(..., min_length=4, max_length=6)

class UserRegister(BaseModel):
    mobile: str
    email: Optional[EmailStr] = None
    name: str
    role: str = Field(..., pattern="^(customer|therapist|vendor|employee|admin)$")
    password: Optional[str] = Field(None, min_length=8)

class UserLogin(BaseModel):
    mobile: str
    password: str

class TherapistLogin(BaseModel):
    employee_id: str
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: dict

class TokenRefresh(BaseModel):
    refresh_token: str

class UserResponse(BaseModel):
    id: str
    mobile: str
    email: Optional[str]
    name: str
    role: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
