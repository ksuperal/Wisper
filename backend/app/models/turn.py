from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TurnInput(BaseModel):
    user_input: str  # What the other side just said

class TurnResponse(BaseModel):
    id: str
    session_id: str
    turn_number: int
    user_input: str
    move_type: str
    ai_line: str
    ai_why: str
    ai_watch: str
    created_at: datetime

    class Config:
        from_attributes = True

class MoveResponse(BaseModel):
    move_type: str
    line: str
    why: str
    watch_for: str
