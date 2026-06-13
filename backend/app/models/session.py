from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SessionCreate(BaseModel):
    type: str  # salary, rent, contract, vendor, other
    goal: str
    opening_offer: Optional[str] = None
    walk_away: str
    leverage: Optional[str] = None
    pressure: Optional[str] = None
    style: str = "balanced"  # collaborative, balanced, hardball

class SessionResponse(BaseModel):
    id: str
    user_id: str
    type: str
    status: str  # setup, live, completed, abandoned
    goal: str
    opening_offer: Optional[str]
    walk_away: str
    leverage: Optional[str]
    style: str
    outcome: Optional[str]
    outcome_amount: Optional[str]
    score: Optional[float]
    created_at: datetime
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True

class SessionUpdate(BaseModel):
    status: Optional[str] = None
    outcome: Optional[str] = None
    outcome_amount: Optional[str] = None
    score: Optional[float] = None
    completed_at: Optional[datetime] = None

class SessionOutcome(BaseModel):
    status: str  # won, ongoing, user_walked, they_walked
    outcome_text: str
    feeling: str  # confident, nervous, in_control, pressured, neutral
