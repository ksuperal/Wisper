'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MoveCard, ThinkingCard } from '@/components/ui/move-card';
import { Button } from '@/components/ui/button';
import { LiveDot } from '@/components/ui/live-dot';
import { DEMO_MOVES } from '@/lib/constants';
import { Move } from '@/lib/types';

export default function LiveSessionPage() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'move' | 'thinking'>('move');
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState(false);
  const recTimer = useRef<NodeJS.Timeout | null>(null);

  const move = DEMO_MOVES[idx];
  const isLast = idx === DEMO_MOVES.length - 1;

  useEffect(() => {
    return () => {
      if (recTimer.current) clearTimeout(recTimer.current);
    };
  }, []);

  const toggleMic = () => {
    if (recording) {
      if (recTimer.current) clearTimeout(recTimer.current);
      setRecording(false);
      return;
    }
    setRecording(true);
    recTimer.current = setTimeout(() => {
      setInput(move.they || '');
      setRecording(false);
    }, 1500);
  };

  const getMove = () => {
    if (!input.trim() || phase === 'thinking') return;
    if (isLast) {
      alert('Deal closed! Session complete.');
      return;
    }
    setPhase('thinking');
    setTimeout(() => {
      setIdx(i => i + 1);
      setInput('');
      setPhase('move');
    }, 1700);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', flexDirection: 'column' }}>
      {/* Live Top Bar */}
      <div
        style={{
          height: 52,
          borderBottom: '1px solid var(--deal-raised)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <LiveDot />
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--deal-danger)' }}>LIVE</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--deal-text-3)' }}>Salary · TechCorp</span>
        <span style={{ fontSize: 11, color: '#444' }}>Move {idx + 1}</span>
      </div>

      {/* Context bar */}
      <div
        style={{
          padding: '8px 20px',
          borderBottom: '1px solid var(--deal-surface)',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 11, color: 'var(--deal-text-4)' }}>
          Goal $95K · Floor $88K · Offer $82K
        </span>
      </div>

      {/* Scrollable content area */}
      <div
        className="deal-scroll"
        style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 8px' }}
      >
        {phase === 'thinking' ? (
          <ThinkingCard />
        ) : (
          <MoveCard move={move} />
        )}
      </div>

      {/* Fixed bottom input area */}
      <div
        style={{
          borderTop: '1px solid var(--deal-raised)',
          padding: '12px 20px',
          flexShrink: 0,
          background: 'var(--deal-ink)',
        }}
      >
        <div className="caption" style={{ marginBottom: 8, color: 'var(--deal-text-3)' }}>
          WHAT DID THEY JUST SAY?
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={phase === 'thinking'}
          placeholder={recording ? 'Listening…' : 'Type or tap mic to whisper...'}
          style={{
            width: '100%',
            minHeight: 58,
            borderRadius: 12,
            padding: 14,
            background: 'var(--deal-surface)',
            color: phase === 'thinking' ? '#333' : 'var(--deal-text-1)',
            fontSize: 14,
            lineHeight: 1.6,
            border: `1px solid var(--deal-border)`,
            outline: 'none',
            resize: 'none',
          }}
        />

        {/* Action row */}
        <div style={{ display: 'flex', gap: 10, marginTop: 10, alignItems: 'center' }}>
          <Button
            variant="mic"
            isRecording={recording}
            onClick={toggleMic}
            disabled={phase === 'thinking'}
          >
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke={recording ? 'var(--deal-danger)' : 'var(--deal-text-2)'}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
              <line x1="12" y1="18" x2="12" y2="22" />
            </svg>
          </Button>

          <Button
            variant="primary"
            fullWidth
            onClick={getMove}
            disabled={phase === 'thinking' || !input.trim()}
          >
            {phase === 'thinking' ? 'Thinking…' : isLast ? 'Close the deal ✓' : 'Get my move →'}
          </Button>
        </div>

        {/* Danger row */}
        <div style={{ display: 'flex', marginTop: 12 }}>
          <button
            onClick={() => router.push('/sessions/1/end')}
            className="press"
            style={{
              flex: 1,
              height: 32,
              fontSize: 13,
              color: 'var(--deal-signal)',
              fontWeight: 500,
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Deal closed
          </button>
          <div style={{ width: 1, background: 'var(--deal-raised)', margin: '4px 0' }} />
          <button
            onClick={() => router.push('/sessions/1/end')}
            className="press"
            style={{
              flex: 1,
              height: 32,
              fontSize: 13,
              color: 'var(--deal-danger)',
              fontWeight: 500,
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Walk away
          </button>
        </div>
      </div>
    </div>
  );
}
