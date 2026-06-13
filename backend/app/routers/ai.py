from fastapi import APIRouter, HTTPException
from app.models.turn import TurnInput, MoveResponse, TurnResponse
from app.models.session import SessionOutcome
from app.db import supabase as db
from app.services import claude_service
import uuid
from typing import List

router = APIRouter()

@router.post("/{session_id}/strategy")
async def generate_strategy(session_id: str):
    """Generate pre-session strategy brief"""
    try:
        session = await db.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        strategy = await claude_service.generate_strategy(session)

        # Update session status to 'live' after strategy is generated
        await db.update_session(session_id, {"status": "live"})

        return strategy

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{session_id}/turn", response_model=MoveResponse)
async def get_next_move(session_id: str, turn_input: TurnInput):
    """Get next tactical move (CORE ENDPOINT)"""
    try:
        # Load session context
        session = await db.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        # Load conversation history
        turns = await db.get_session_turns(session_id)

        # Get AI move
        move = await claude_service.get_next_move(session, turns, turn_input.user_input)

        # Save turn to database
        turn_number = len(turns) + 1
        await db.create_turn({
            "id": str(uuid.uuid4()),
            "session_id": session_id,
            "turn_number": turn_number,
            "user_input": turn_input.user_input,
            "move_type": move["move_type"],
            "ai_line": move["line"],
            "ai_why": move["why"],
            "ai_watch": move["watch_for"]
        })

        return move

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{session_id}/turns", response_model=List[TurnResponse])
async def get_session_turns(session_id: str):
    """Get all turns for a session"""
    try:
        turns = await db.get_session_turns(session_id)
        return turns
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{session_id}/debrief")
async def generate_debrief(session_id: str, outcome: SessionOutcome):
    """Generate post-session debrief report"""
    try:
        session = await db.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        turns = await db.get_session_turns(session_id)

        # Generate debrief
        debrief = await claude_service.generate_debrief(
            session,
            turns,
            outcome.dict()
        )

        # Save debrief to database
        await db.create_debrief({
            "id": str(uuid.uuid4()),
            "session_id": session_id,
            "score": debrief["score"],
            "what_worked": debrief["what_worked"],
            "improve_next": debrief["improve_next"],
            "their_tactics": debrief["their_tactics"],
            "outcome_analysis": debrief["outcome_analysis"],
            "full_report": debrief["full_report"]
        })

        # Update session with outcome and score
        await db.update_session(session_id, {
            "status": "completed",
            "outcome": outcome.status,
            "outcome_amount": outcome.outcome_text,
            "score": debrief["score"]
        })

        return debrief

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{session_id}/debrief")
async def get_debrief(session_id: str):
    """Get debrief for a session"""
    try:
        debrief = await db.get_session_debrief(session_id)
        if not debrief:
            raise HTTPException(status_code=404, detail="Debrief not found")
        return debrief
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
