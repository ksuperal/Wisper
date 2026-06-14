# Implementation Roadmap - Complete Deal App

This document shows **exactly** what needs to be implemented to match the standalone HTML prototype.

## Current Status

### ✅ Already Implemented (in `frontend-new/`)

1. **Design System** - 100% Complete
   - All CSS variables and tokens
   - All animations
   - All typography
   - Press feedback interactions

2. **Core UI Components** - 70% Complete
   - ✅ Button (all variants)
   - ✅ MoveBadge
   - ✅ MoveCard & ThinkingCard
   - ✅ LiveDot
   - ❌ Missing: Pill, Field, TextInput, TextArea, Card variants, StatusPill, StatCard

3. **Pages** - 30% Complete
   - ✅ Homepage (splash)
   - ✅ Dashboard (basic)
   - ✅ Live Session (core functionality)
   - ❌ Missing: All other screens

---

## 📋 Complete Implementation Checklist

### Phase 1: Missing UI Components (2-3 hours)

Create these in `frontend-new/components/ui/`:

#### 1.1 Form Components
- [ ] `pill.tsx` - Category/style selector pills
- [ ] `field.tsx` - Label + helper text wrapper
- [ ] `text-input.tsx` - Single-line input
- [ ] `text-area.tsx` - Multi-line textarea with auto-expand
- [ ] `step-progress.tsx` - Setup form step indicator

#### 1.2 Display Components
- [ ] `card.tsx` - Card with variants (standard, raised, signal, danger)
- [ ] `stat-card.tsx` - Dashboard statistics display
- [ ] `status-pill.tsx` - Won/Lost/Ongoing badges
- [ ] `score-bar.tsx` - Animated progress bar for debrief
- [ ] `empty-state.tsx` - No sessions placeholder

#### 1.3 Icons
- [ ] `icons.tsx` - SVG icon library (chevron, arrow, mic, home, etc.)
- [ ] `diamond-mark.tsx` - Logo component

### Phase 2: Layout Components (1-2 hours)

Create these in `frontend-new/components/layout/`:

- [ ] `screen.tsx` - Base screen wrapper with padding
- [ ] `top-bar.tsx` - Back button + title bar
- [ ] `live-top-bar.tsx` - Already done in live page, extract it
- [ ] `tab-bar.tsx` - Bottom navigation
- [ ] `bottom-sheet.tsx` - Modal overlay from bottom
- [ ] `safe-bottom.tsx` - Safe area spacer

### Phase 3: Screen Components (2-3 hours)

Create these in `frontend-new/components/screens/`:

- [ ] `session-row.tsx` - Dashboard session list item
- [ ] `section-label.tsx` - Uppercase section headers
- [ ] `list-block.tsx` - Checkmark/arrow lists (for debrief)

### Phase 4: Missing Pages (4-6 hours)

#### 4.1 Onboarding/Splash
- [ ] `app/page.tsx` - Replace current with full 3-slide onboarding
  - Slide 1: Co-pilot illustration
  - Slide 2: Input illustration
  - Slide 3: Move card illustration
  - Swipeable dots
  - "Skip" / "Next" / "Get started" buttons

#### 4.2 Setup Flow
- [ ] `app/sessions/new/page.tsx` - Step 1
  - Category pills (Salary, Rent, Contract, Medical, Vendor, Other)
  - Goal textarea
  - Offer & Walk-away inputs
  - Step progress indicator
  - "Next →" button

- [ ] `app/sessions/new/step-2/page.tsx` - Step 2
  - Leverage textarea
  - Pressure textarea (optional)
  - Style selector (Collaborative/Balanced/Hardball)
  - "Generate my strategy →" button with loading state

#### 4.3 Strategy/Playbook
- [ ] `app/sessions/[id]/strategy/page.tsx`
  - Ready badge
  - Your range card (Target/Floor/Gap)
  - Opening move card with tone-adjusted copy
  - "Their likely moves" list
  - "Your leverage" list
  - "I'm ready — start session" button

#### 4.4 Session End
- [ ] `app/sessions/[id]/end/page.tsx`
  - 2x2 grid of outcome options
  - "What was agreed?" textarea
  - "How did you feel?" pills
  - "Get my debrief →" button

#### 4.5 Debrief
- [ ] `app/sessions/[id]/debrief/page.tsx`
  - Result header card with gain amount
  - Animated score (0 → 7.8)
  - Animated score bar
  - "What worked" list (green checkmarks)
  - "Do better next time" list (amber arrows)
  - "They used on you" tactic pills
  - "Share my win" button (if won)

#### 4.6 Win Card
- [ ] `app/sessions/[id]/win/page.tsx`
  - Full-screen dark green background
  - Deal logo centered
  - Animated gain number
  - From/to amounts
  - Share buttons (Copy/Instagram/X/WhatsApp)

### Phase 5: Enhancements (1-2 hours)

#### 5.1 Dashboard Improvements
- [ ] Session list with real data
- [ ] Tab bar navigation (Home/Sessions/Stats/Profile)
- [ ] Stats cards with real numbers

#### 5.2 Live Session Improvements
- [ ] Move history (collapsible)
- [ ] Mic pulse ring animation
- [ ] Recording timer display

#### 5.3 Data & State Management
- [ ] Create demo data file
- [ ] Add session state management
- [ ] Implement navigation flow between screens

---

## 🎯 Priority Order

### Must-Have for MVP (Core Flow)
1. ✅ Live Session - **DONE**
2. Setup Form (Step 1 & 2) - **HIGH PRIORITY**
3. Strategy Brief - **HIGH PRIORITY**
4. Session End - **MEDIUM**
5. Debrief - **MEDIUM**

### Nice-to-Have
6. Full Onboarding - **LOW**
7. Win Card - **LOW**
8. Tab Navigation - **LOW**

---

## 📝 Code Examples

### Example: Pill Component

```typescript
// components/ui/pill.tsx
'use client';

interface PillProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export function Pill({ children, selected, onClick }: PillProps) {
  return (
    <button
      className="press"
      onClick={onClick}
      style={{
        height: 34,
        padding: '0 14px',
        borderRadius: 999,
        flexShrink: 0,
        fontSize: 13,
        fontWeight: selected ? 600 : 500,
        background: selected ? 'var(--deal-signal)' : 'var(--deal-raised)',
        color: selected ? 'var(--deal-signal-ink)' : 'var(--deal-text-3)',
        border: selected ? '1px solid var(--deal-signal)' : '1px solid var(--deal-border)',
        transition: 'all 0.15s var(--ease)',
      }}
    >
      {children}
    </button>
  );
}
```

### Example: Setup Step 1 Page

```typescript
// app/sessions/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pill } from '@/components/ui/pill';
import { Field } from '@/components/ui/field';
import { TextArea } from '@/components/ui/text-area';
import { TextInput } from '@/components/ui/text-input';
import { Button } from '@/components/ui/button';
import { TopBar } from '@/components/layout/top-bar';
import { StepProgress } from '@/components/ui/step-progress';

const CATEGORIES = [
  { id: 'salary', label: 'Salary' },
  { id: 'rent', label: 'Rent' },
  { id: 'contract', label: 'Contract' },
  { id: 'medical', label: 'Medical' },
  { id: 'vendor', label: 'Vendor' },
  { id: 'other', label: 'Other' },
];

export default function NewSessionPage() {
  const router = useRouter();
  const [data, setData] = useState({
    category: '',
    goal: '',
    offer: '',
    floor: '',
  });

  const isValid = data.category && data.goal && data.offer && data.floor;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deal-ink)', display: 'flex', flexDirection: 'column' }}>
      <TopBar title="New negotiation" onBack={() => router.back()} />
      <div style={{ padding: '4px 20px 0' }}>
        <StepProgress step={1} total={2} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 18 }}>The situation</h1>

        <div className="caption" style={{ marginBottom: 10 }}>NEGOTIATION TYPE</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20 }}>
          {CATEGORIES.map(cat => (
            <Pill
              key={cat.id}
              selected={data.category === cat.id}
              onClick={() => setData({ ...data, category: cat.id })}
            >
              {cat.label}
            </Pill>
          ))}
        </div>

        <Field label="WHAT DO YOU WANT TO ACHIEVE?">
          <TextArea
            value={data.goal}
            onChange={(v) => setData({ ...data, goal: v })}
            placeholder="Get a salary of $95,000 plus a 6-month review."
          />
        </Field>

        <div style={{ display: 'flex', gap: 12 }}>
          <Field label="THEIR OFFER">
            <TextInput
              value={data.offer}
              onChange={(v) => setData({ ...data, offer: v })}
              placeholder="$82,000"
            />
          </Field>
          <Field label="WALK-AWAY">
            <TextInput
              value={data.floor}
              onChange={(v) => setData({ ...data, floor: v })}
              placeholder="$88,000"
            />
          </Field>
        </div>
      </div>

      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--deal-raised)' }}>
        <Button
          variant="primary"
          fullWidth
          onClick={() => router.push('/sessions/new/step-2')}
          disabled={!isValid}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
```

---

## 🔌 Backend Integration Points

Once the UI is complete, these endpoints need to be connected:

### Auth Endpoints
- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me`

### Session Endpoints
- `POST /sessions` - Create session (after setup Step 2)
- `GET /sessions` - List sessions (dashboard)
- `GET /sessions/{id}` - Get session details

### AI Endpoints
- `POST /sessions/{id}/strategy` - Generate playbook (after Step 2)
- `POST /sessions/{id}/turn` - Get next move (live session)
- `POST /sessions/{id}/debrief` - Generate debrief

### Voice Endpoint
- `POST /voice/transcribe` - Transcribe mic audio

---

## 📊 Estimated Time

| Phase | Task | Time | Status |
|-------|------|------|--------|
| 1 | UI Components | 2-3h | ⬜ Not started |
| 2 | Layout Components | 1-2h | ⬜ Not started |
| 3 | Screen Components | 2-3h | ⬜ Not started |
| 4 | Pages | 4-6h | 🟡 30% done |
| 5 | Enhancements | 1-2h | ⬜ Not started |
| **TOTAL** | | **10-16h** | **~20% complete** |

---

## 🚀 Quick Start Guide

To complete the implementation:

### 1. Start with Components
```bash
cd frontend-new
# Copy components from the prototype or build them fresh
# Reference: zucgoo-design-system/project/components.jsx
```

### 2. Build Pages in Order
1. Setup forms (most important after live session)
2. Strategy brief
3. Session end & debrief
4. Win card
5. Enhanced onboarding

### 3. Test Each Screen
Navigate through the full flow:
1. Homepage → Dashboard
2. Dashboard → Setup Step 1 → Step 2
3. Step 2 → Strategy
4. Strategy → Live Session
5. Live → Session End → Debrief
6. Debrief → Win Card

---

## 📦 What You Have vs. What's Needed

### You Have (in `frontend-new/`)
- ✅ Perfect design tokens
- ✅ Working live session
- ✅ Basic dashboard
- ✅ Button component
- ✅ MoveBadge component
- ✅ MoveCard component

### You Need
- ❌ 10 more UI components
- ❌ 6 layout components
- ❌ 3 screen components
- ❌ 6 complete pages
- ❌ Navigation state management
- ❌ Backend API integration

---

## 💡 Tips

1. **Copy from prototype** - The `zucgoo-design-system/project/` files are well-structured. Convert JSX → TSX.

2. **Keep it simple** - Don't over-engineer. The prototype uses inline styles - that's fine for now.

3. **Test incrementally** - Build one component, test it, move to next.

4. **Use placeholders** - Don't wait for backend. Use demo data like the prototype does.

5. **Mobile-first** - The design is mobile-only. Don't worry about desktop yet.

---

## 🎬 Next Actions

**To achieve 100% parity with the standalone prototype:**

1. Create all missing UI components (from Phase 1)
2. Build setup form pages (Step 1 & 2)
3. Build strategy brief page
4. Build session end page
5. Build debrief page with animations
6. Build win card share screen
7. Add navigation state management
8. Test complete flow end-to-end

**Want me to implement any of these now?** Just say which phase/component to start with!
