"""
db.py - Supabase client singleton

HOW TO CREATE THE `businesses` TABLE IN SUPABASE:
--------------------------------------------------
Run this SQL in the Supabase SQL Editor:

  CREATE TABLE businesses (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name          TEXT NOT NULL,
    email                 TEXT UNIQUE NOT NULL,
    hashed_password       TEXT NOT NULL,
    subscription_status   TEXT NOT NULL DEFAULT 'inactive',
    paypal_subscription_id TEXT,
    created_at            TIMESTAMPTZ DEFAULT NOW()
  );

  -- Disable Row Level Security for server-side access via service role key
  -- (the service role key bypasses RLS automatically, but disabling it keeps
  --  things simple while you're still in development)
  ALTER TABLE businesses DISABLE ROW LEVEL SECURITY;
"""

from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError(
        "SUPABASE_URL and SUPABASE_KEY must be set in your .env file."
    )

# Single shared client – thread-safe for reads/writes via the PostgREST API.
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
