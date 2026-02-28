"""
main.py - FastAPI application entry point

HOW TO RUN (development):
--------------------------
  cd backend
  pip install -r requirements.txt
  uvicorn main:app --reload --port 8000

HOW TO DEPLOY (production):
-----------------------------
  Option A – Render.com (free tier available):
    1. Push repo to GitHub
    2. New Web Service → connect repo
    3. Build command:  pip install -r requirements.txt
    4. Start command:  uvicorn main:app --host 0.0.0.0 --port $PORT
    5. Add env vars in the Render dashboard

  Option B – Railway / Fly.io / any VPS:
    - Same start command; expose PORT from env
    - Add a Procfile: web: uvicorn main:app --host 0.0.0.0 --port $PORT

  HTTPS is REQUIRED in production for:
    - Secure JWT transmission
    - PayPal webhook delivery (PayPal rejects plain HTTP endpoints)
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.paypal import router as paypal_router

app = FastAPI(
    title="Hackier API",
    description="Backend for Hackier – subscription-gated SaaS toolkit.",
    version="1.0.0",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
# In production, replace the wildcard with your exact frontend domain, e.g.:
#   "https://hackier.io"
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # fallback
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth_router)
app.include_router(paypal_router)


# ── Health check ─────────────────────────────────────────────────────────────
@app.get("/", tags=["health"])
async def root():
    return {"status": "ok", "service": "Hackier API"}
