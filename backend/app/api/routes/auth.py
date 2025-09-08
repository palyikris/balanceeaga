from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from supabase import create_client
import os
from app.api.models.auth import SendLoginEmailIn, VerifyOTPIn


router = APIRouter(prefix="/auth", tags=["auth"])
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
	raise RuntimeError("SUPABASE_URL and SUPABASE_ANON_KEY environment variables must be set.")

supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)


@router.post("/send-login-email")
def send_login_email(payload: SendLoginEmailIn):
  
    """Sends a login email with OTP to the specified email address."""
    
    try:
        resp = supabase.auth.sign_in_with_otp(
            {
                "email": payload.email,
                "options": {"should_create_user": False},
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    return {"detail": "Email sent if the user exists."}


@router.post("/verify-otp")
def verify_otp(payload: VerifyOTPIn):
    """Verifies the OTP token and returns a session if valid."""
    
    try:
        resp = supabase.auth.verify_otp(
            {
                "email": payload.email,
                "token": payload.token,
                "type": "email",
            }
        )
        
        return resp
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
        
@router.post("/logout")
def logout():
    """Logs out the current user by clearing the session."""
    try:
        resp = supabase.auth.sign_out()
        return {"detail": "Logged out successfully."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )