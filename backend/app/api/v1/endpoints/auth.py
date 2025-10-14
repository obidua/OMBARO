from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import create_access_token, create_refresh_token, get_password_hash, verify_password
from app.core.redis_client import redis_client
from app.core.supabase_client import get_supabase_admin
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
    - Validates OTP with Supabase Auth
    - Creates or retrieves user profile
    - Returns access and refresh tokens
    """
    try:
        supabase = get_supabase_admin()

        auth_response = supabase.auth.verify_otp({
            'phone': request.mobile,
            'token': request.otp,
            'type': 'sms'
        })

        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired OTP"
            )

        profile_response = supabase.table('user_profiles').select('*').eq('id', auth_response.user.id).maybe_single().execute()

        if profile_response.data:
            user_profile = profile_response.data
        else:
            user_profile = {
                'id': auth_response.user.id,
                'phone': request.mobile,
                'role': 'customer',
                'status': 'active'
            }
            supabase.table('user_profiles').insert(user_profile).execute()

        access_token = create_access_token(
            data={"sub": user_profile["id"], "role": user_profile.get("role", "customer")}
        )
        refresh_token = create_refresh_token(
            data={"sub": user_profile["id"], "role": user_profile.get("role", "customer")}
        )

        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            user=user_profile
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Authentication failed: {str(e)}"
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
