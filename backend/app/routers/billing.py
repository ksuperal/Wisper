from fastapi import APIRouter, HTTPException, Request
from app.config import settings
import stripe
from pydantic import BaseModel

router = APIRouter()

# Initialize Stripe
stripe.api_key = settings.stripe_secret_key

class CheckoutRequest(BaseModel):
    price_id: str
    user_id: str

@router.get("/plans")
async def get_plans():
    """Get available pricing plans"""
    return {
        "plans": [
            {
                "id": "free",
                "name": "Free",
                "price": 0,
                "features": [
                    "1 session per month",
                    "Text input only",
                    "Basic debrief"
                ]
            },
            {
                "id": "pro_monthly",
                "name": "Pro Monthly",
                "price": 29,
                "price_id": settings.stripe_pro_monthly_price_id,
                "features": [
                    "Unlimited sessions",
                    "Voice input",
                    "Full debrief with score",
                    "Session history",
                    "Shareable win cards"
                ]
            },
            {
                "id": "pro_yearly",
                "name": "Pro Yearly",
                "price": 249,
                "price_id": settings.stripe_pro_yearly_price_id,
                "features": [
                    "All Pro features",
                    "Save $99/year"
                ]
            },
            {
                "id": "pay_per_session",
                "name": "Pay Per Session",
                "price": 9,
                "price_id": settings.stripe_session_price_id,
                "features": [
                    "Full pro features",
                    "Single session",
                    "No commitment"
                ]
            }
        ]
    }

@router.post("/checkout")
async def create_checkout_session(checkout_req: CheckoutRequest):
    """Create Stripe checkout session"""
    try:
        checkout_session = stripe.checkout.Session.create(
            customer_email=None,  # Get from user
            client_reference_id=checkout_req.user_id,
            payment_method_types=["card"],
            line_items=[{
                "price": checkout_req.price_id,
                "quantity": 1,
            }],
            mode="subscription" if "monthly" in checkout_req.price_id or "yearly" in checkout_req.price_id else "payment",
            success_url=f"{settings.frontend_url}/dashboard?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{settings.frontend_url}/pricing",
        )

        return {"url": checkout_session.url}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/portal")
async def create_customer_portal(user_id: str):
    """Create customer billing portal session"""
    try:
        # Get customer ID from user
        from app.db.supabase import get_user_by_id
        user = await get_user_by_id(user_id)

        if not user or not user.get("stripe_customer_id"):
            raise HTTPException(status_code=400, detail="No billing account found")

        portal_session = stripe.billing_portal.Session.create(
            customer=user["stripe_customer_id"],
            return_url=f"{settings.frontend_url}/settings/billing",
        )

        return {"url": portal_session.url}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks"""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.stripe_webhook_secret
        )

        # Handle different event types
        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            # Update user plan in database
            # ...

        elif event["type"] == "customer.subscription.deleted":
            subscription = event["data"]["object"]
            # Downgrade user to free plan
            # ...

        return {"status": "success"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
