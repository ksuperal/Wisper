// Core types for the Deal app

export type MoveType =
  | 'anchor'
  | 'mirror'
  | 'bridge'
  | 'question'
  | 'silence'
  | 'walkaway'
  | 'close'
  | 'takeit';

export type SessionStatus = 'ongoing' | 'won' | 'lost' | 'walked';

export type NegotiationType = 'salary' | 'rent' | 'contract' | 'medical' | 'vendor' | 'other';

export type StyleType = 'collaborative' | 'balanced' | 'hardball';

export interface Move {
  n: number;
  type: MoveType;
  say: string;
  why: string;
  watch: string;
  they?: string;
}

export interface Session {
  id: string;
  type: NegotiationType;
  title: string;
  goal: string;
  offer: string;
  floor: string;
  leverage?: string;
  pressure?: string;
  style: StyleType;
  status: SessionStatus;
  createdAt: Date;
  moveCount: number;
  finalAmount?: number;
}

export interface MoveConfig {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}
