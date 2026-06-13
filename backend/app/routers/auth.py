from fastapi import APIRouter, HTTPException, Depends
from app.models.user import UserCreate, UserResponse
from app.db.supabase import supabase
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    user: UserResponse
    access_token: str
    refresh_token: str

@router.post("/signup", response_model=AuthResponse)
async def signup(user_data: UserCreate):
    """Sign up a new user"""
    try:
        # Create auth user in Supabase
        auth_response = supabase.auth.sign_up({
            "email": user_data.email,
            "password": user_data.password,
        })

        if not auth_response.user:
            raise HTTPException(status_code=400, detail="Failed to create user")

        # Create user profile in database
        from app.db.supabase import create_user
        user_profile = await create_user({
            "id": auth_response.user.id,
            "email": user_data.email,
            "name": user_data.name,
            "plan": "free",
            "sessions_used": 0
        })

        return {
            "user": user_profile,
            "access_token": auth_response.session.access_token,
            "refresh_token": auth_response.session.refresh_token
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=AuthResponse)
async def login(credentials: LoginRequest):
    """Log in an existing user"""
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": credentials.email,
            "password": credentials.password
        })

        if not auth_response.user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        # Get user profile
        from app.db.supabase import get_user_by_id
        user_profile = await get_user_by_id(auth_response.user.id)

        return {
            "user": user_profile,
            "access_token": auth_response.session.access_token,
            "refresh_token": auth_response.session.refresh_token
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/google")
async def google_auth():
    """Initiate Google OAuth flow"""
    try:
        auth_response = supabase.auth.sign_in_with_oauth({
            "provider": "google"
        })
        return {"url": auth_response.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/logout")
async def logout():
    """Log out current user"""
    try:
        supabase.auth.sign_out()
        return {"message": "Logged out successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me", response_model=UserResponse)
async def get_current_user(token: str = Depends(lambda: None)):
    """Get current authenticated user"""
    try:
        # In production, extract token from Authorization header
        user = supabase.auth.get_user()
        if not user:
            raise HTTPException(status_code=401, detail="Not authenticated")

        from app.db.supabase import get_user_by_id
        user_profile = await get_user_by_id(user.user.id)

        return user_profile

    except Exception as e:
        raise HTTPException(status_code=401, detail="Not authenticated")
