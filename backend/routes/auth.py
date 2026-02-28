"""
routes/auth.py - Signup, Login, and /me endpoints

JWT Flow:
  1. Client POSTs credentials → receives a signed JWT
  2. Client stores JWT (localStorage / secure cookie)
  3. Every protected request includes:  Authorization: Bearer <token>
"""

from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr

from config import JWT_ALGORITHM, JWT_EXPIRE_MINUTES, JWT_SECRET
from db import supabase

router = APIRouter(prefix="/auth", tags=["auth"])

# ── Password hashing ─────────────────────────────────────────────────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ── OAuth2 bearer token extraction ───────────────────────────────────────────
# tokenUrl points to the login endpoint so Swagger UI can authenticate.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# ── Pydantic models ──────────────────────────────────────────────────────────
class SignupRequest(BaseModel):
    company_name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ── Helpers ───────────────────────────────────────────────────────────────────
def _hash_password(plain: str) -> str:
    return pwd_context.hash(plain)


def _verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def _create_jwt(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    payload = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=JWT_EXPIRE_MINUTES)
    )
    payload.update({"exp": expire})
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def _get_business_by_email(email: str) -> Optional[dict]:
    """Return the first matching row or None."""
    result = (
        supabase.table("businesses")
        .select("*")
        .eq("email", email)
        .limit(1)
        .execute()
    )
    rows = result.data
    return rows[0] if rows else None


# ── Shared JWT dependency (used by protected routes) ─────────────────────────
async def get_current_business(token: str = Depends(oauth2_scheme)) -> dict:
    """
    Decode JWT and return the business row from Supabase.
    Raises 401 if token is invalid / expired.
    Raises 403 if subscription is not active.
    """
    credentials_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email: str = payload.get("sub")  # type: ignore[assignment]
        if email is None:
            raise credentials_exc
    except JWTError:
        raise credentials_exc

    business = _get_business_by_email(email)
    if business is None:
        raise credentials_exc

    if business["subscription_status"] != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="An active subscription is required to access this resource.",
        )

    return business


# ── Routes ────────────────────────────────────────────────────────────────────
@router.post("/signup", response_model=TokenResponse, status_code=201)
async def signup(body: SignupRequest):
    """
    Create a new business account.
    - Hashes the password with bcrypt
    - Inserts a row in Supabase
    - Returns a signed JWT
    """
    # Prevent duplicate accounts
    if _get_business_by_email(body.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    hashed = _hash_password(body.password)

    result = (
        supabase.table("businesses")
        .insert(
            {
                "company_name": body.company_name,
                "email": body.email,
                "hashed_password": hashed,
                "subscription_status": "inactive",
            }
        )
        .execute()
    )

    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create account. Please try again.",
        )

    token = _create_jwt({"sub": body.email})
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest):
    """
    Authenticate an existing business.
    - Fetches the row from Supabase
    - Verifies the bcrypt password
    - Returns a signed JWT
    """
    business = _get_business_by_email(body.email)

    if not business or not _verify_password(body.password, business["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    token = _create_jwt({"sub": body.email})
    return TokenResponse(access_token=token)


@router.get("/me")
async def me(business: dict = Depends(get_current_business)):
    """
    Return the authenticated business's public profile.
    Excludes hashed_password from the response.
    """
    return {
        "id": business["id"],
        "company_name": business["company_name"],
        "email": business["email"],
        "subscription_status": business["subscription_status"],
        "paypal_subscription_id": business["paypal_subscription_id"],
        "created_at": business["created_at"],
    }
