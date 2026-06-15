'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Screen, SafeBottom } from '@/components/layout/screen';
import { TopBar } from '@/components/layout/top-bar';
import { Card } from '@/components/ui/card';
import { ScoreBar } from '@/components/ui/score-bar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { saveCompletedSession, getSession } from '@/lib/storage';
import { generateDebrief, checkBackendHealth } from '@/lib/api';

interface DebriefData {
  score: number;
  moves: number;
  won: number;
  strengths: string[];
  improvements: string[];
}

export default function DebriefPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = (params?.id as string) || '1';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DebriefData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadDebrief = async () => {
      try {
        const endData = sessionStorage.getItem('sessionEndData');
        if (!endData) {
          router.push('/dashboard');
          return;
        }

        const end = JSON.parse(endData);
        const isBackendHealthy = await checkBackendHealth();

        if (isBackendHealthy && sessionId !== '1') {
          // Generate debrief via API
          const debriefData = await generateDebrief(sessionId, {
            outcome: end.outcome,
            outcome_details: end.agreed,
            feeling: end.feeling,
          });

          setData({
            score: debriefData.score,
            moves: debriefData.moves_count,
            won: debriefData.won_amount,
            strengths: debriefData.strengths,
            improvements: debriefData.improvements,
          });
        } else {
          // Use demo data
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
        }
      } catch (error) {
        console.error('Failed to load debrief:', error);
        // Fall back to demo data
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
      } finally {
        setLoading(false);
      }
    };

    loadDebrief();
  }, [sessionId, router]);

  useEffect(() => {
    // Save session to localStorage when debrief loads (only once)
    if (data && !saved) {
      // Check if this session already exists in localStorage
      const existingSession = getSession(sessionId);

      if (existingSession) {
        // Session already saved, don't save again
        setSaved(true);
        return;
      }

      // Get session data from sessionStorage
      const setupData = sessionStorage.getItem('fullSetupData');
      const endData = sessionStorage.getItem('sessionEndData');

      if (setupData && endData) {
        const setup = JSON.parse(setupData);
        const end = JSON.parse(endData);

        // Use the actual sessionId from URL, not a generated one
        saveCompletedSession({
          id: sessionId,
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
  }, [data, saved, sessionId]);

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
        <TopBar title="Session debrief" onBack={() => router.push('/dashboard')} close />

        <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0' }}>
          {/* Top outcome card */}
          <Card
            variant="signal"
            style={{
              marginBottom: 16,
              padding: 20,
              background: 'var(--deal-signal-bg)',
              border: '1px solid var(--deal-signal-dim)',
            }}
          >
            <div style={{ fontSize: 12, color: 'var(--deal-text-3)', marginBottom: 8 }}>
              Salary · TechCorp · June 13
            </div>
            <div style={{ fontSize: 13, color: 'var(--deal-text-2)', marginBottom: 12 }}>
              $82K → $93K + $5K signing
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: 'var(--deal-signal)',
                  letterSpacing: '-0.03em',
                }}
              >
                +${(data.won / 1000).toFixed(0)},000
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--deal-signal)' }}>Above target</div>
          </Card>

          {/* Score card */}
          <Card style={{ marginBottom: 16, padding: 20, background: 'var(--deal-surface)' }}>
            <div className="caption" style={{ fontSize: 10, marginBottom: 12, color: 'var(--deal-text-3)' }}>
              NEGOTIATION SCORE
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {(data.score / 10).toFixed(1)}
              </div>
              <div style={{ fontSize: 20, color: 'var(--deal-text-3)' }}>/10</div>
            </div>
            <div style={{ height: 4, background: 'var(--deal-border)', borderRadius: 999, overflow: 'hidden' }}>
              <div
                style={{
                  width: `${data.score}%`,
                  height: '100%',
                  background: 'var(--deal-signal)',
                  transition: 'width 0.6s ease-out',
                }}
              />
            </div>
          </Card>

          {/* What Worked */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--deal-signal)',
                }}
              />
              <div className="caption" style={{ fontSize: 10, color: 'var(--deal-signal)' }}>
                WHAT WORKED
              </div>
            </div>
            {data.strengths.map((text, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  marginBottom: 14,
                }}
              >
                <Icon name="check" size={16} color="var(--deal-signal)" strokeWidth={2.5} />
                <span style={{ fontSize: 14, color: 'var(--deal-text-2)', lineHeight: 1.6 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Do Better Next Time */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--deal-warn)',
                }}
              />
              <div className="caption" style={{ fontSize: 10, color: 'var(--deal-warn)' }}>
                DO BETTER NEXT TIME
              </div>
            </div>
            {data.improvements.map((text, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  marginBottom: 14,
                }}
              >
                <span style={{ color: 'var(--deal-warn)', fontWeight: 600, fontSize: 14 }}>→</span>
                <span style={{ fontSize: 14, color: 'var(--deal-text-2)', lineHeight: 1.6 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          <SafeBottom h={12} />
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)', flexShrink: 0 }}>
          <Button
            variant="primary"
            fullWidth
            onClick={() => router.push('/sessions/1/win')}
            style={{ background: 'var(--deal-danger)', border: 'none' }}
          >
            <Icon name="share" size={18} color="#fff" strokeWidth={2} /> Share my win
          </Button>
        </div>
        <SafeBottom h={16} />
      </Screen>
    </div>
  );
}
