from anthropic import Anthropic
from app.config import settings
from app.prompts.system_prompt import (
    LIVECOACH_SYSTEM_PROMPT,
    build_context_injection,
    build_turn_response
)
from app.prompts.debrief_prompt import DEBRIEF_SYSTEM_PROMPT, build_debrief_prompt
import re

# Initialize Anthropic client
client = Anthropic(api_key=settings.anthropic_api_key)

def parse_move_response(text: str) -> dict:
    """Parse the AI response into structured format"""
    result = {
        "move_type": "",
        "line": "",
        "why": "",
        "watch_for": ""
    }

    lines = text.strip().split('\n')

    for line in lines:
        line = line.strip()
        if line.startswith("MOVE:"):
            result["move_type"] = line.replace("MOVE:", "").strip()
        elif line.startswith("SAY THIS:"):
            # Extract quoted text
            match = re.search(r'"([^"]*)"', line)
            if match:
                result["line"] = match.group(1)
            else:
                result["line"] = line.replace("SAY THIS:", "").strip()
        elif line.startswith("WHY:"):
            result["why"] = line.replace("WHY:", "").strip()
        elif line.startswith("WATCH FOR:"):
            result["watch_for"] = line.replace("WATCH FOR:", "").strip()

    return result

def build_message_history(session: dict, turns: list, new_input: str) -> list:
    """Build conversation history for Claude"""
    messages = []

    # First message: context injection
    messages.append({
        "role": "user",
        "content": build_context_injection(session)
    })
    messages.append({
        "role": "assistant",
        "content": "Understood. I have your full situation. I'm ready to coach you in real time. What's their opening position or what just happened?"
    })

    # Add all previous turns
    for turn in turns:
        messages.append({
            "role": "user",
            "content": f'THEY JUST SAID: "{turn.get("user_input", "")}"\n\nWhat\'s my next move?'
        })
        messages.append({
            "role": "assistant",
            "content": build_turn_response(turn)
        })

    # Add new input
    messages.append({
        "role": "user",
        "content": f'THEY JUST SAID: "{new_input}"\n\nWhat\'s my next move?'
    })

    return messages

async def get_next_move(session: dict, turns: list, user_input: str) -> dict:
    """Get the next tactical move from Claude"""

    messages = build_message_history(session, turns, user_input)

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=300,  # Keep responses short and fast
        system=LIVECOACH_SYSTEM_PROMPT,
        messages=messages
    )

    # Parse the response
    raw_text = response.content[0].text
    parsed = parse_move_response(raw_text)

    return parsed

async def generate_strategy(session: dict) -> dict:
    """Generate pre-session strategy brief"""

    prompt = f"""Generate an opening strategy for this negotiation:

TYPE: {session.get('type', 'general')}
GOAL: {session.get('goal', '')}
CURRENT OFFER: {session.get('opening_offer', '')}
WALK-AWAY: {session.get('walk_away', '')}
LEVERAGE: {session.get('leverage', '')}
STYLE: {session.get('style', 'balanced')}

Provide:
1. OPENING_MOVE: What move type and exact line to open with
2. LIKELY_TACTICS: 3 tactics they'll probably use
3. POWER_MOVES: 3 tactical advantages the user has
4. GAP_ANALYSIS: How far apart you are and path to close it

Format as a structured JSON response."""

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=800,
        system="You are a negotiation strategist creating pre-session game plans.",
        messages=[{"role": "user", "content": prompt}]
    )

    # For now, return raw text (we can parse this better later)
    return {"strategy": response.content[0].text}

async def generate_debrief(session: dict, turns: list, outcome: dict) -> dict:
    """Generate post-session debrief report"""

    prompt = build_debrief_prompt(session, turns, outcome)

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        system=DEBRIEF_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}]
    )

    raw_text = response.content[0].text

    # Parse the debrief response
    result = {
        "score": 0.0,
        "score_reasoning": "",
        "what_worked": [],
        "improve_next": [],
        "their_tactics": [],
        "outcome_analysis": ""
    }

    lines = raw_text.split('\n')
    current_section = None

    for line in lines:
        line = line.strip()
        if line.startswith("SCORE:"):
            try:
                score_text = line.replace("SCORE:", "").strip()
                result["score"] = float(re.search(r'[\d.]+', score_text).group())
            except:
                result["score"] = 5.0
        elif line.startswith("SCORE_REASONING:"):
            result["score_reasoning"] = line.replace("SCORE_REASONING:", "").strip()
            current_section = "score_reasoning"
        elif line.startswith("WHAT_WORKED:"):
            current_section = "what_worked"
        elif line.startswith("IMPROVE_NEXT_TIME:"):
            current_section = "improve_next"
        elif line.startswith("THEIR_TACTICS:"):
            current_section = "their_tactics"
        elif line.startswith("OUTCOME_ANALYSIS:"):
            current_section = "outcome_analysis"
            result["outcome_analysis"] = line.replace("OUTCOME_ANALYSIS:", "").strip()
        elif line.startswith("-") or line.startswith("•"):
            item = line.lstrip("-•").strip()
            if current_section == "what_worked":
                result["what_worked"].append(item)
            elif current_section == "improve_next":
                result["improve_next"].append(item)
            elif current_section == "their_tactics":
                result["their_tactics"].append(item)
        elif current_section == "outcome_analysis" and line:
            result["outcome_analysis"] += " " + line
        elif current_section == "score_reasoning" and line and not line.startswith("WHAT_WORKED"):
            result["score_reasoning"] += " " + line

    result["full_report"] = raw_text

    return result
