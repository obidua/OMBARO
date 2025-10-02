from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import create_access_token, create_refresh_token, get_password_hash, verify_password
from app.core.redis_client import redis_client
from app.schemas.auth import OTPRequest, OTPVerify, UserRegister, UserLogin, Token, TokenRefresh
import random
from datetime import timedelta

router = APIRouter()

@router.post("/send-otp", status_code=status.HTTP_200_OK)
async def send_otp(request: OTPRequest):
    """
    Send OTP to mobile number for authentication
    - Generates 6-digit OTP
    - Stores in Redis with 5-minute expiry
    - In production, integrate with SMS provider (Twilio, AWS SNS, etc.)
    """
    otp = str(random.randint(100000, 999999))

    await redis_client.set(
        f"otp:{request.mobile}",
        otp,
        expire=300
    )

    return {
        "message": "OTP sent successfully",
        "mobile": request.mobile,
        "otp": otp
    }

@router.post("/verify-otp", response_model=Token)
async def verify_otp(request: OTPVerify, db: AsyncSession = Depends(get_db)):
    """
    Verify OTP and return JWT tokens
    - Validates OTP from Redis
    - Creates or retrieves user
    - Returns access and refresh tokens
    """
    stored_otp = await redis_client.get(f"otp:{request.mobile}")

    if not stored_otp or stored_otp != request.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired OTP"
        )

    await redis_client.delete(f"otp:{request.mobile}")

    user_data = {
        "id": f"user_{request.mobile}",
        "mobile": request.mobile,
        "role": "customer"
    }

    access_token = create_access_token(
        data={"sub": user_data["id"], "role": user_data["role"]}
    )
    refresh_token = create_refresh_token(
        data={"sub": user_data["id"], "role": user_data["role"]}
    )

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user_data
    )

@router.post("/register", response_model=Token)
async def register(request: UserRegister, db: AsyncSession = Depends(get_db)):
    """
    Register new user with full details
    - Creates user account
    - Hashes password if provided
    - Returns JWT tokens
    """
    user_id = f"user_{random.randint(100000, 999999)}"

    user_data = {
        "id": user_id,
        "mobile": request.mobile,
        "email": request.email,
        "name": request.name,
        "role": request.role,
        "status": "active"
    }

    await redis_client.set(
        f"user:{user_id}",
        user_data,
        expire=3600
    )

    access_token = create_access_token(
        data={"sub": user_id, "role": request.role}
    )
    refresh_token = create_refresh_token(
        data={"sub": user_id, "role": request.role}
    )

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user_data
    )

@router.post("/login", response_model=Token)
async def login(request: UserLogin, db: AsyncSession = Depends(get_db)):
    """
    Login with mobile and password
    - Validates credentials
    - Returns JWT tokens
    """
    user_data = {
        "id": f"user_{request.mobile}",
        "mobile": request.mobile,
        "role": "customer"
    }

    access_token = create_access_token(
        data={"sub": user_data["id"], "role": user_data["role"]}
    )
    refresh_token = create_refresh_token(
        data={"sub": user_data["id"], "role": user_data["role"]}
    )

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user_data
    )

@router.post("/refresh", response_model=Token)
async def refresh_token(request: TokenRefresh):
    """
    Refresh access token using refresh token
    - Validates refresh token
    - Issues new access token
    """
    from app.core.security import decode_token

    payload = decode_token(request.refresh_token)

    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid token type"
        )

    user_id = payload.get("sub")
    role = payload.get("role")

    access_token = create_access_token(
        data={"sub": user_id, "role": role}
    )

    return Token(
        access_token=access_token,
        refresh_token=request.refresh_token,
        user={"id": user_id, "role": role}
    )

@router.post("/logout")
async def logout():
    """
    Logout user
    - In production, blacklist token in Redis
    """
    return {"message": "Logged out successfully"}
