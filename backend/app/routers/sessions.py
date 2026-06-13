from fastapi import APIRouter, HTTPException
from typing import List
from app.models.session import SessionCreate, SessionResponse, SessionUpdate
from app.db import supabase as db
import uuid
from datetime import datetime

router = APIRouter()

@router.post("", response_model=SessionResponse)
async def create_session(session_data: SessionCreate, user_id: str = "test-user"):
    """Create a new negotiation session"""
    try:
        session = await db.create_session({
            "id": str(uuid.uuid4()),
            "user_id": user_id,  # In production, get from auth token
            "type": session_data.type,
            "status": "setup",
            "goal": session_data.goal,
            "opening_offer": session_data.opening_offer,
            "walk_away": session_data.walk_away,
            "leverage": session_data.leverage,
            "pressure": session_data.pressure,
            "style": session_data.style,
        })

        return session

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("", response_model=List[SessionResponse])
async def list_sessions(user_id: str = "test-user"):
    """List all sessions for the current user"""
    try:
        sessions = await db.get_user_sessions(user_id)
        return sessions
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{session_id}", response_model=SessionResponse)
async def get_session(session_id: str):
    """Get a specific session"""
    try:
        session = await db.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        return session
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{session_id}", response_model=SessionResponse)
async def update_session(session_id: str, updates: SessionUpdate):
    """Update a session (outcome, status, etc.)"""
    try:
        update_data = updates.dict(exclude_unset=True)

        if updates.completed_at is None and updates.status == "completed":
            update_data["completed_at"] = datetime.utcnow().isoformat()

        session = await db.update_session(session_id, update_data)

        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        return session

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{session_id}")
async def delete_session(session_id: str):
    """Delete a session"""
    try:
        await db.delete_session(session_id)
        return {"message": "Session deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
