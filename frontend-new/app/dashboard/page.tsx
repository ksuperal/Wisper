'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Screen, SafeBottom } from '@/components/layout/screen';
import { TabBar } from '@/components/layout/tab-bar';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { SessionRow } from '@/components/screens/session-row';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionLabel } from '@/components/screens/section-label';
import { DEMO_USER } from '@/lib/constants';
import { getCompletedSessions, getStats } from '@/lib/storage';

export default function DashboardPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalSessions: 0, totalWon: 0 });

  useEffect(() => {
    // Load sessions and stats from localStorage
    setSessions(getCompletedSessions());
    setStats(getStats());
  }, []);

  const hasSessions = sessions.length > 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', flexDirection: 'column' }}>
      <Screen>
        <div className="deal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 0' }}>
          {/* Top greeting */}
          <div style={{ paddingTop: 24, paddingBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <p className="caption" style={{ marginBottom: 4 }}>GOOD MORNING</p>
                <h1 style={{ fontSize: 18, fontWeight: 500, color: 'var(--deal-text-1)' }}>
                  {DEMO_USER.fullName}
                </h1>
              </div>
              <Link href="/settings">
                <div
                  style={{
                    width: 34,
                    height: 34,
                    background: 'var(--deal-raised)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--deal-text-2)',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {DEMO_USER.initials}
                </div>
              </Link>
            </div>

            {/* Hero CTA Card */}
            <Link href="/sessions/new" style={{ textDecoration: 'none' }}>
              <button
                className="press"
                style={{
                  width: '100%',
                  background: 'var(--deal-signal)',
                  borderRadius: 16,
                  padding: 20,
                  textAlign: 'left',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#004D35',
                        marginBottom: 4,
                      }}
                    >
                      START NEGOTIATION
                    </p>
                    <h2 style={{ fontSize: 18, fontWeight: 500, color: '#001A12' }}>
                      What are you negotiating?
                    </h2>
                  </div>
                  <span style={{ fontSize: 20, color: '#004D35' }}>→</span>
                </div>
              </button>
            </Link>
          </div>

          {/* Stats row */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <StatCard label="SESSIONS" value={stats.totalSessions.toString()} />
              <StatCard label="TOTAL WON" value={stats.totalWon > 0 ? `$${(stats.totalWon / 1000).toFixed(0)}K` : '$0'} />
            </div>
          </div>

          {/* Recent sessions */}
          <SectionLabel style={{ marginBottom: 12 }}>RECENT SESSIONS</SectionLabel>

          {hasSessions ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {sessions.map((session) => (
                <SessionRow key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <EmptyState
              emoji="🤝"
              title="No deals yet"
              description="Start your first negotiation and see how much more you can win."
              buttonText="Start negotiating"
              buttonHref="/sessions/new"
            />
          )}

          <SafeBottom h={100} />
        </div>

        <TabBar activeTab="home" />
      </Screen>
    </div>
  );
}
