"""
config.py - Centralised settings loaded from .env

PRODUCTION CHECKLIST:
- Rotate JWT_SECRET before going live
- Swap PAYPAL_API to https://api-m.paypal.com (live)
- Never expose SUPABASE_KEY or JWT_SECRET to the frontend
"""

import os
from dotenv import load_dotenv

load_dotenv()

# ── Supabase ────────────────────────────────────────────────────────────────
# Use the "service role" key (NOT the anon key) so the backend can bypass RLS.
# Keep this key strictly server-side.
SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

# ── JWT ─────────────────────────────────────────────────────────────────────
# Generate with: python -c "import secrets; print(secrets.token_hex(32))"
JWT_SECRET: str = os.getenv("JWT_SECRET", "change_me_before_production")
JWT_ALGORITHM: str = "HS256"
JWT_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

# ── PayPal ───────────────────────────────────────────────────────────────────
# Sandbox:  https://api-m.sandbox.paypal.com
# Live:     https://api-m.paypal.com  ← switch before launch!
PAYPAL_CLIENT_ID: str = os.getenv("PAYPAL_CLIENT_ID", "")
PAYPAL_SECRET: str = os.getenv("PAYPAL_SECRET", "")
PAYPAL_API: str = os.getenv("PAYPAL_API", "https://api-m.sandbox.paypal.com")

# ── Server ───────────────────────────────────────────────────────────────────
PORT: int = int(os.getenv("PORT", 8000))
