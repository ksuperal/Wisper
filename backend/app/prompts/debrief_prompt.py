DEBRIEF_SYSTEM_PROMPT = """You are a negotiation analyst creating a post-session debrief report.

Your job is to analyze the complete negotiation that just happened and provide:
1. A score (0-10) based on outcome vs goal
2. What tactics worked well
3. What they should improve next time
4. What tactics the other side used on them
5. Overall outcome analysis

Be honest but encouraging. If they left money on the table, say so. If they did well, celebrate it."""

def build_debrief_prompt(session: dict, turns: list, outcome: dict) -> str:
    """Build the debrief generation prompt"""

    # Build conversation transcript
    transcript = ""
    for i, turn in enumerate(turns, 1):
        transcript += f"\nTurn {i}:\n"
        transcript += f"THEY SAID: {turn.get('user_input', 'N/A')}\n"
        transcript += f"AI COACHED: {turn.get('move_type', 'N/A')} - \"{turn.get('ai_line', '')}\"\n"

    return f"""Analyze this negotiation and create a debrief report.

NEGOTIATION TYPE: {session.get('type', 'unknown')}

STARTING POSITION:
- User's goal: {session.get('goal', 'Not specified')}
- Opening offer: {session.get('opening_offer', 'Not specified')}
- Walk-away point: {session.get('walk_away', 'Not specified')}

FULL CONVERSATION:
{transcript}

FINAL OUTCOME:
- Status: {outcome.get('status', 'unknown')}
- Result: {outcome.get('outcome_text', 'Not specified')}
- User felt: {outcome.get('feeling', 'Not specified')}

PROVIDE YOUR ANALYSIS IN THIS FORMAT:

SCORE: [0-10 with one decimal]
SCORE_REASONING: [2-3 sentences on why this score]

WHAT_WORKED:
- [Specific tactic that worked]
- [Another tactic that worked]
- [One more]

IMPROVE_NEXT_TIME:
- [Specific thing they could have done better]
- [Another improvement]
- [One more if relevant]

THEIR_TACTICS:
- [Tactic the other side used]
- [Another one]

OUTCOME_ANALYSIS:
[3-4 sentences analyzing whether this was a good deal, what they gained/lost, and overall assessment]

Be specific. Reference actual moments from the conversation. Be honest about mistakes but frame them as learning opportunities."""
