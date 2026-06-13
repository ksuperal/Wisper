from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Anthropic
    anthropic_api_key: str

    # OpenAI (Whisper)
    openai_api_key: str

    # Supabase
    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str

    # Stripe
    stripe_secret_key: str
    stripe_webhook_secret: str
    stripe_publishable_key: str
    stripe_pro_monthly_price_id: Optional[str] = None
    stripe_pro_yearly_price_id: Optional[str] = None
    stripe_session_price_id: Optional[str] = None

    # App
    frontend_url: str = "http://localhost:3000"
    app_url: str = "http://localhost:8000"

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
