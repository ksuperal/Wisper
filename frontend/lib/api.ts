const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Session types
export interface Session {
  id: string
  user_id: string
  type: string
  status: string
  goal: string
  opening_offer?: string
  walk_away: string
  leverage?: string
  pressure?: string
  style: string
  outcome?: string
  outcome_amount?: string
  score?: number
  created_at: string
  completed_at?: string
}

export interface SessionCreate {
  type: string
  goal: string
  opening_offer?: string
  walk_away: string
  leverage?: string
  pressure?: string
  style: string
}

export interface Turn {
  id: string
  session_id: string
  turn_number: number
  user_input: string
  move_type: string
  ai_line: string
  ai_why: string
  ai_watch: string
  created_at: string
}

export interface Move {
  move_type: string
  line: string
  why: string
  watch_for: string
}

export interface Debrief {
  score: number
  score_reasoning: string
  what_worked: string[]
  improve_next: string[]
  their_tactics: string[]
  outcome_analysis: string
  full_report: string
}

// API client class
class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor() {
    this.baseUrl = API_URL
  }

  setToken(token: string) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Session endpoints
  async createSession(data: SessionCreate): Promise<Session> {
    return this.request<Session>('/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getSessions(): Promise<Session[]> {
    return this.request<Session[]>('/sessions')
  }

  async getSession(id: string): Promise<Session> {
    return this.request<Session>(`/sessions/${id}`)
  }

  async updateSession(id: string, updates: Partial<Session>): Promise<Session> {
    return this.request<Session>(`/sessions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  }

  async deleteSession(id: string): Promise<void> {
    return this.request<void>(`/sessions/${id}`, {
      method: 'DELETE',
    })
  }

  // AI endpoints
  async generateStrategy(sessionId: string): Promise<{ strategy: string }> {
    return this.request<{ strategy: string }>(`/sessions/${sessionId}/strategy`, {
      method: 'POST',
    })
  }

  async getNextMove(sessionId: string, userInput: string): Promise<Move> {
    return this.request<Move>(`/sessions/${sessionId}/turn`, {
      method: 'POST',
      body: JSON.stringify({ user_input: userInput }),
    })
  }

  async getSessionTurns(sessionId: string): Promise<Turn[]> {
    return this.request<Turn[]>(`/sessions/${sessionId}/turns`)
  }

  async generateDebrief(
    sessionId: string,
    outcome: {
      status: string
      outcome_text: string
      feeling: string
    }
  ): Promise<Debrief> {
    return this.request<Debrief>(`/sessions/${sessionId}/debrief`, {
      method: 'POST',
      body: JSON.stringify(outcome),
    })
  }

  async getDebrief(sessionId: string): Promise<Debrief> {
    return this.request<Debrief>(`/sessions/${sessionId}/debrief`)
  }

  // Voice endpoint
  async transcribeAudio(audioBlob: Blob): Promise<{ text: string }> {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'audio.webm')

    const response = await fetch(`${this.baseUrl}/voice/transcribe`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Transcription failed')
    }

    return response.json()
  }
}

export const api = new ApiClient()
