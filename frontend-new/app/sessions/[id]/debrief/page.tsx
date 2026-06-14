'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Screen, SafeBottom } from '@/components/layout/screen';
import { TopBar } from '@/components/layout/top-bar';
import { Card } from '@/components/ui/card';
import { ScoreBar } from '@/components/ui/score-bar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { saveCompletedSession } from '@/lib/storage';

interface DebriefData {
  score: number;
  moves: number;
  won: number;
  strengths: string[];
  improvements: string[];
}

export default function DebriefPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DebriefData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Simulate AI debrief generation
    setTimeout(() => {
      setData({
        score: 87,
        moves: 4,
        won: 11000,
        strengths: [
          'Strong anchor — you set $103K early, making their $82K feel low.',
          'Used silence effectively after their "ceiling" claim.',
          'Bridge to signing bonus was creative when base stalled.',
        ],
        improvements: [
          'Your mirror could have been stronger — repeat their exact words.',
          'You accepted the first counteroffer. Push one more time.',
        ],
      });
      setLoading(false);
    }, 2400);
  }, []);

  useEffect(() => {
    // Save session to localStorage when debrief loads
    if (data && !saved) {
      // Get session data from sessionStorage
      const setupData = sessionStorage.getItem('fullSetupData');
      const endData = sessionStorage.getItem('sessionEndData');

      if (setupData && endData) {
        const setup = JSON.parse(setupData);
        const end = JSON.parse(endData);

        saveCompletedSession({
          id: '1',
          type: setup.category || 'salary',
          title: `${setup.category || 'Salary'} · TechCorp`,
          goal: setup.goal,
          offer: setup.offer,
          floor: setup.floor,
          leverage: setup.leverage,
          style: setup.style || 'balanced',
          status: end.outcome || 'won',
          createdAt: new Date(),
          completedAt: new Date(),
          moveCount: data.moves,
          score: data.score,
          finalAmount: data.won,
          agreed: end.agreed,
          feeling: end.feeling,
        });

        setSaved(true);
      }
    }
  }, [data, saved]);

  if (loading || !data) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              gap: 6,
              fontSize: 14,
              color: 'var(--deal-text-3)',
            }}
          >
            <span className="thinking-dot" style={{ animationDelay: '0s' }}>·</span>
            <span className="thinking-dot" style={{ animationDelay: '0.2s' }}>·</span>
            <span className="thinking-dot" style={{ animationDelay: '0.4s' }}>·</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--deal-text-3)', marginTop: 12 }}>
            Analyzing your session
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', flexDirection: 'column' }}>
      <Screen>
        <TopBar title="Your debrief" onBack={() => router.push('/dashboard')} close />

        <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
          {/* Score card */}
          <Card variant="signal" style={{ marginBottom: 20, textAlign: 'center' }}>
            <div className="caption" style={{ color: 'var(--deal-signal)', marginBottom: 8 }}>
              YOUR SCORE
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: 'var(--deal-signal)',
                letterSpacing: '-0.03em',
                marginBottom: 4,
              }}
            >
              {data.score}
            </div>
            <ScoreBar score={data.score} />
            <div style={{ fontSize: 12, color: 'var(--deal-text-2)', marginTop: 12 }}>
              Strong performance
            </div>
          </Card>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <Card style={{ flex: 1, padding: 16, textAlign: 'center' }}>
              <div className="caption" style={{ fontSize: 10, marginBottom: 6 }}>MOVES</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--deal-signal)' }}>
                {data.moves}
              </div>
            </Card>
            <Card style={{ flex: 1, padding: 16, textAlign: 'center' }}>
              <div className="caption" style={{ fontSize: 10, marginBottom: 6 }}>WON</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--deal-signal)' }}>
                ${(data.won / 1000).toFixed(0)}K
              </div>
            </Card>
          </div>

          {/* Strengths */}
          <div className="caption" style={{ marginBottom: 12 }}>WHAT YOU DID WELL</div>
          <Card style={{ marginBottom: 20 }}>
            {data.strengths.map((text, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: i < data.strengths.length - 1 ? '1px solid var(--deal-raised)' : 'none',
                }}
              >
                <Icon name="check" size={16} color="var(--deal-signal)" strokeWidth={2.4} />
                <span style={{ fontSize: 13, color: 'var(--deal-text-2)', lineHeight: 1.6, flex: 1 }}>
                  {text}
                </span>
              </div>
            ))}
          </Card>

          {/* Improvements */}
          <div className="caption" style={{ marginBottom: 12 }}>ROOM FOR IMPROVEMENT</div>
          <Card style={{ marginBottom: 20 }}>
            {data.improvements.map((text, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: i < data.improvements.length - 1 ? '1px solid var(--deal-raised)' : 'none',
                }}
              >
                <span style={{ color: 'var(--deal-warn)', fontWeight: 700, fontSize: 14, lineHeight: 1.5 }}>
                  →
                </span>
                <span style={{ fontSize: 13, color: 'var(--deal-text-2)', lineHeight: 1.6, flex: 1 }}>
                  {text}
                </span>
              </div>
            ))}
          </Card>

          <SafeBottom h={12} />
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
          <Button variant="primary" fullWidth onClick={() => router.push('/sessions/1/win')}>
            Share this win <Icon name="arrowRight" size={18} color="var(--deal-signal-ink)" />
          </Button>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--deal-text-3)',
                fontSize: 12,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Back to dashboard
            </button>
          </div>
        </div>
        <SafeBottom h={16} />
      </Screen>
    </div>
  );
}
