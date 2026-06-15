/**
 * API Client for LiveCoach Backend
 * Handles all communication with the FastAPI backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ============================================================================
// Types (matching backend models)
// ============================================================================

export interface SessionCreate {
  type: string; // 'salary', 'rent', 'contract', etc.
  goal: string;
  opening_offer: string;
  walk_away: string;
  leverage: string;
  pressure?: string;
  style: string; // 'collaborative', 'balanced', 'hardball'
}

export interface SessionResponse {
  id: string;
  user_id: string;
  type: string;
  status: 'setup' | 'live' | 'completed';
  goal: string;
  opening_offer: string;
  walk_away: string;
  leverage: string;
  pressure?: string;
  style: string;
  outcome?: string;
  outcome_details?: string;
  created_at: string;
  completed_at?: string;
}

export interface StrategyResponse {
  target_range: string;
  floor: string;
  gap: string;
  opening_move: string;
  their_likely_moves: string[];
  your_leverage: string[];
}

export interface TurnInput {
  user_input: string;
}

export interface MoveResponse {
  move_type: string; // 'anchor', 'counter', 'hold', etc.
  line: string; // What to say
  why: string; // Explanation
  watch_for: string; // Red flags
}

export interface TurnResponse {
  id: string;
  session_id: string;
  turn_number: number;
  user_input: string;
  move_type: string;
  ai_line: string;
  ai_why: string;
  ai_watch: string;
  created_at: string;
}

export interface SessionOutcome {
  outcome: 'won' | 'ongoing' | 'walked' | 'theywalked';
  outcome_details: string;
  feeling?: string;
}

export interface DebriefResponse {
  score: number; // 0-100
  won_amount: number;
  moves_count: number;
  strengths: string[];
  improvements: string[];
  tactics_used_on_you?: string[];
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Create a new negotiation session
 */
export async function createSession(data: SessionCreate): Promise<SessionResponse> {
  const response = await fetch(`${API_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create session');
  }

  return response.json();
}

/**
 * Get a specific session
 */
export async function getSession(sessionId: string): Promise<SessionResponse> {
  const response = await fetch(`${API_URL}/sessions/${sessionId}`);

  if (!response.ok) {
    throw new Error('Failed to get session');
  }

  return response.json();
}

/**
 * List all sessions for the user
 */
export async function getUserSessions(): Promise<SessionResponse[]> {
  const response = await fetch(`${API_URL}/sessions`);

  if (!response.ok) {
    throw new Error('Failed to get sessions');
  }

  return response.json();
}

/**
 * Generate pre-session strategy brief
 */
export async function generateStrategy(sessionId: string): Promise<StrategyResponse> {
  const response = await fetch(`${API_URL}/sessions/${sessionId}/strategy`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to generate strategy');
  }

  return response.json();
}

/**
 * Get next tactical move (CORE FEATURE)
 */
export async function getNextMove(
  sessionId: string,
  userInput: string
): Promise<MoveResponse> {
  const response = await fetch(`${API_URL}/sessions/${sessionId}/turn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_input: userInput }),
  });

  if (!response.ok) {
    throw new Error('Failed to get next move');
  }

  return response.json();
}

/**
 * Get all turns for a session
 */
export async function getSessionTurns(sessionId: string): Promise<TurnResponse[]> {
  const response = await fetch(`${API_URL}/sessions/${sessionId}/turns`);

  if (!response.ok) {
    throw new Error('Failed to get session turns');
  }

  return response.json();
}

/**
 * End a session and update outcome
 */
export async function endSession(
  sessionId: string,
  outcome: SessionOutcome
): Promise<SessionResponse> {
  const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: 'completed',
      outcome: outcome.outcome,
      outcome_details: outcome.outcome_details,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to end session');
  }

  return response.json();
}

/**
 * Generate post-session debrief
 */
export async function generateDebrief(
  sessionId: string,
  outcome: SessionOutcome
): Promise<DebriefResponse> {
  const response = await fetch(`${API_URL}/sessions/${sessionId}/debrief`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(outcome),
  });

  if (!response.ok) {
    throw new Error('Failed to generate debrief');
  }

  return response.json();
}

/**
 * Transcribe audio (for voice input)
 */
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob);

  const response = await fetch(`${API_URL}/voice/transcribe`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to transcribe audio');
  }

  const data = await response.json();
  return data.transcription;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if the backend is running
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000), // 5s timeout
    });
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}
