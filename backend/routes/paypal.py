"""
routes/paypal.py - PayPal subscription verification and webhook handler

HOW TO CREATE A PAYPAL SUBSCRIPTION PLAN:
------------------------------------------
1. Log into PayPal Developer Dashboard → My Apps & Credentials
2. Create a Sandbox app to get CLIENT_ID and SECRET
3. Products → Create Product
4. Subscriptions → Create Plan (link it to the product, set billing cycle)
5. Copy the Plan ID (e.g. P-XXXXXXXX) and use it in your frontend JS:
     paypal.Buttons({ createSubscription: (data, actions) =>
       actions.subscription.create({ plan_id: 'P-XXXXXXXX' }) }).render(...)

HOW TO REGISTER A PAYPAL WEBHOOK:
------------------------------------
1. In PayPal Developer Dashboard → your app → Webhooks → Add Webhook
2. URL:  https://your-domain.com/paypal/webhook
3. Events to subscribe:
     - BILLING.SUBSCRIPTION.ACTIVATED
     - BILLING.SUBSCRIPTION.CANCELLED
4. Copy the Webhook ID for production signature verification.

PRODUCTION SECURITY:
- Verify webhook signature using PayPal-Auth-Algo, PayPal-Cert-Url, etc.
  See: https://developer.paypal.com/api/rest/webhooks/
- Never trust webhook body alone in production.
"""

import requests
from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel

from app_config import PAYPAL_API, PAYPAL_CLIENT_ID, PAYPAL_SECRET
from db import supabase
from routes.auth import get_current_business

router = APIRouter(prefix="/paypal", tags=["paypal"])


# ── Pydantic models ──────────────────────────────────────────────────────────
class VerifySubscriptionRequest(BaseModel):
    subscriptionID: str


# ── Helpers ───────────────────────────────────────────────────────────────────
def _get_paypal_access_token() -> str:
    """
    Exchange CLIENT_ID + SECRET for a short-lived OAuth2 access token.
    PayPal tokens expire after ~9 hours; for high-traffic APIs, cache this.
    """
    response = requests.post(
        f"{PAYPAL_API}/v1/oauth2/token",
        data={"grant_type": "client_credentials"},
        auth=(PAYPAL_CLIENT_ID, PAYPAL_SECRET),
        timeout=10,
    )
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"PayPal token exchange failed: {response.text}",
        )
    return response.json()["access_token"]


def _fetch_subscription(subscription_id: str, access_token: str) -> dict:
    """Call the PayPal Subscriptions API and return the subscription object."""
    url = f"{PAYPAL_API}/v1/billing/subscriptions/{subscription_id}"
    response = requests.get(
        url,
        headers={"Authorization": f"Bearer {access_token}"},
        timeout=10,
    )
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"PayPal subscription lookup failed: {response.text}",
        )
    return response.json()


def _update_subscription_in_db(
    business_id: str,
    subscription_status: str,
    paypal_subscription_id: str | None = None,
) -> None:
    """Update subscription fields on the business row."""
    update_data: dict = {"subscription_status": subscription_status}
    if paypal_subscription_id is not None:
        update_data["paypal_subscription_id"] = paypal_subscription_id

    supabase.table("businesses").update(update_data).eq("id", business_id).execute()


# ── Routes ────────────────────────────────────────────────────────────────────
@router.post("/verify-subscription")
async def verify_subscription(
    body: VerifySubscriptionRequest,
    business: dict = Depends(get_current_business),
):
    """
    Verify a PayPal subscription and activate the business account.

    Frontend calls this immediately after the PayPal button's onApprove fires:
        onApprove: (data) => fetch('/paypal/verify-subscription', {
            method: 'POST',
            body: JSON.stringify({ subscriptionID: data.subscriptionID })
        })
    """
    access_token = _get_paypal_access_token()
    subscription = _fetch_subscription(body.subscriptionID, access_token)

    paypal_status = subscription.get("status", "").upper()

    if paypal_status != "ACTIVE":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Subscription is not active (PayPal status: {paypal_status}).",
        )

    _update_subscription_in_db(
        business_id=business["id"],
        subscription_status="active",
        paypal_subscription_id=body.subscriptionID,
    )

    return {
        "message": "Subscription activated successfully.",
        "subscription_status": "active",
        "paypal_subscription_id": body.subscriptionID,
    }


@router.post("/webhook")
async def paypal_webhook(request: Request):
    """
    Handle PayPal webhook events.

    Supported events:
      - BILLING.SUBSCRIPTION.ACTIVATED  → set subscription_status = 'active'
      - BILLING.SUBSCRIPTION.CANCELLED  → set subscription_status = 'cancelled'

    PRODUCTION NOTE:
    Before trusting this payload, verify the PayPal webhook signature using
    the headers: PayPal-Auth-Algo, PayPal-Cert-Url, PayPal-Transmission-Id,
    PayPal-Transmission-Sig, PayPal-Transmission-Time.
    See: https://developer.paypal.com/api/rest/webhooks/
    """
    try:
        event = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON payload.")

    event_type: str = event.get("event_type", "")
    resource: dict = event.get("resource", {})
    subscription_id: str = resource.get("id", "")

    if not subscription_id:
        # Not all events carry a subscription resource; silently ack.
        return {"received": True}

    # Find the business that owns this subscription
    result = (
        supabase.table("businesses")
        .select("id")
        .eq("paypal_subscription_id", subscription_id)
        .limit(1)
        .execute()
    )
    rows = result.data

    if not rows:
        # Unknown subscription – still return 200 so PayPal stops retrying.
        return {"received": True, "note": "subscription not found in database"}

    business_id = rows[0]["id"]

    if event_type == "BILLING.SUBSCRIPTION.ACTIVATED":
        _update_subscription_in_db(business_id, "active")

    elif event_type == "BILLING.SUBSCRIPTION.CANCELLED":
        _update_subscription_in_db(business_id, "cancelled")

    # Always return 200 – PayPal retries on any non-2xx response.
    return {"received": True, "event_type": event_type}
