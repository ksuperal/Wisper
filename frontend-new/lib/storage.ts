// Local storage utilities for session management
// This will be replaced with API calls when backend is integrated

export interface CompletedSession {
  id: string;
  type: 'salary' | 'rent' | 'contract' | 'medical' | 'vendor' | 'other';
  title: string;
  goal: string;
  offer: string;
  floor: string;
  leverage: string;
  style: 'collaborative' | 'balanced' | 'hardball';
  status: 'won' | 'ongoing' | 'walked' | 'theywalked';
  createdAt: Date;
  completedAt: Date;
  moveCount: number;
  score: number;
  finalAmount?: number;
  agreed?: string;
  feeling?: string;
}

const SESSIONS_KEY = 'deal_sessions';
const STATS_KEY = 'deal_stats';

export function saveCompletedSession(session: CompletedSession) {
  const sessions = getCompletedSessions();
  sessions.unshift(session); // Add to beginning of array
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  updateStats(session);
}

export function getCompletedSessions(): CompletedSession[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(SESSIONS_KEY);
  if (!stored) return [];

  const sessions = JSON.parse(stored);
  // Convert date strings back to Date objects
  return sessions.map((s: any) => ({
    ...s,
    createdAt: new Date(s.createdAt),
    completedAt: new Date(s.completedAt),
  }));
}

export function getSession(id: string): CompletedSession | undefined {
  const sessions = getCompletedSessions();
  return sessions.find(s => s.id === id);
}

interface Stats {
  totalSessions: number;
  totalWon: number;
}

function updateStats(session: CompletedSession) {
  const stats = getStats();
  stats.totalSessions += 1;

  if (session.status === 'won' && session.finalAmount) {
    stats.totalWon += session.finalAmount;
  }

  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function getStats(): Stats {
  if (typeof window === 'undefined') return { totalSessions: 0, totalWon: 0 };

  const stored = localStorage.getItem(STATS_KEY);
  if (!stored) return { totalSessions: 0, totalWon: 0 };

  return JSON.parse(stored);
}

export function clearAllSessions() {
  localStorage.removeItem(SESSIONS_KEY);
  localStorage.removeItem(STATS_KEY);
}
