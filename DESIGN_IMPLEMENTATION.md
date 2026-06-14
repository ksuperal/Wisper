# Deal Design Implementation Guide

This document maps the Deal design system from the prototype (`zucgoo-design-system/project/`) to your Next.js implementation.

## Design Source Files

The design prototype includes these key files:

### Core Design System
- **`deal-tokens.css`** - Complete design token specification
  - Colors (dark surfaces, signal green, semantic colors, move type colors)
  - Typography (Inter, Space Grotesk, IBM Plex Sans, JetBrains Mono)
  - Spacing, border radius, animations

### Component Library
- **`components.jsx`** - All reusable UI components
  - `MoveBadge` - Color-coded move type indicators
  - `PrimaryButton`, `GhostButton`, `Spinner`
  - `Card` variants (standard, raised, signal, danger)
  - `StatCard` - Dashboard statistics
  - `LiveDot`, `ThinkingDots` - Live indicators
  - `StatusPill` - Won/Lost/Ongoing badges
  - `Pill` - Category/style selectors
  - `Field`, `TextInput`, `TextArea` - Form inputs
  - `Icon` - SVG icon library
  - `DiamondMark` - Logo component
  - `Reveal` - Entrance animations

### Page Screens
- **`screens-core.jsx`** - Splash & Dashboard
- **`screens-setup.jsx`** - Setup forms (Step 1 & 2)
- **`screens-live.jsx`** - Live session screen (THE CORE)
- **`screens-end.jsx`** - Session end, debrief, win card

### Layout Components
- **`chrome.jsx`** - Navigation & layout
  - `Screen` - Base screen wrapper
  - `TopBar` - Back button + title
  - `LiveTopBar` - Live session header with pulsing dot
  - `BottomTabBar` - Main navigation
  - `SafeBottom` - Safe area spacer

### Demo Data
- **`chrome.jsx`** also contains `DEMO` object with:
  - Sample session data
  - 3 complete negotiation moves with different types
  - Mock playbook content

### Interactive Features
- **`app.jsx`** - Router & state management
- **`tweaks-panel.jsx`** - Design customization panel
- **`ios-frame.jsx`** - Device frame wrapper

## Your Next.js Implementation Status

### ✅ Already Implemented

#### 1. Design Tokens (`frontend/app/globals.css`)
All design tokens from `deal-tokens.css` are implemented:
- Colors: All CSS variables match (`--deal-ink`, `--deal-signal`, etc.)
- Typography: All fonts loaded (Inter, Space Grotesk, IBM Plex Sans, JetBrains Mono)
- Animations: All keyframe animations ported (`deal-live-pulse`, `deal-mic-ring`, etc.)
- Utility classes: `.mono`, `.caption`, `.deal-scroll`

#### 2. UI Components (`frontend/components/ui/`)
All base components exist and match the design spec:

| Prototype Component | Your Implementation | Status |
|---------------------|---------------------|--------|
| `MoveBadge` | `components/ui/move-badge.tsx` | ✅ Complete |
| `PrimaryButton`, `GhostButton` | `components/ui/button.tsx` | ✅ Complete |
| `Card` variants | `components/ui/card.tsx` | ✅ Complete |
| `TextInput`, `TextArea` | `components/ui/input.tsx`, `textarea.tsx` | ✅ Complete |
| `Pill` | `components/ui/pill.tsx` | ✅ Complete |
| `ThinkingDots` | `components/ui/thinking-indicator.tsx` | ✅ Complete |
| `StepProgress` | `components/ui/step-progress.tsx` | ✅ Complete |
| `ScoreBar` | `components/ui/score-bar.tsx` | ✅ Complete |
| `EmptyState` | `components/ui/empty-state.tsx` | ✅ Complete |
| `Toast` | `components/ui/toast.tsx` | ✅ Complete |

#### 3. Screen Components (`frontend/components/screens/`)
Screen-specific components exist:

| Prototype Component | Your Implementation | Status |
|---------------------|---------------------|--------|
| `MoveCard` | `components/screens/move-card.tsx` | ✅ Complete |
| `StatCard` | `components/screens/stat-card.tsx` | ✅ Complete |
| `SessionListItem` | `components/screens/session-list-item.tsx` | ✅ Complete |

#### 4. Layout Components (`frontend/components/layout/`)
Layout components implemented:

| Prototype Component | Your Implementation | Status |
|---------------------|---------------------|--------|
| `TopBar` | `components/layout/top-bar.tsx` | ✅ Complete |
| `LiveTopBar` | `components/layout/live-top-bar.tsx` | ✅ Complete |
| `BottomTabBar` | `components/layout/bottom-tab-bar.tsx` | ✅ Complete |

#### 5. Pages (`frontend/app/`)
All key pages exist:

| Prototype Screen | Your Page | Status |
|------------------|-----------|--------|
| Splash | `app/page.tsx` | 🔄 Currently redirects to dashboard |
| Dashboard | `app/dashboard/page.tsx` | ✅ Implemented |
| Setup Step 1 & 2 | `app/sessions/new/page.tsx` | ✅ Implemented |
| Strategy Brief | `app/sessions/[id]/strategy/page.tsx` | ✅ Implemented |
| Live Session | `app/sessions/[id]/live/page.tsx` | ✅ Implemented |
| Session End | `app/sessions/[id]/end/page.tsx` | ✅ Implemented |
| Debrief | `app/sessions/[id]/debrief/page.tsx` | ✅ Implemented |

### 🔄 Areas to Review/Enhance

#### 1. Landing Page
**Current:** Redirects to dashboard
**Design Spec:** Should show:
- Diamond logo + "Deal" wordmark
- Tagline: "Stop leaving money on the table."
- 3 onboarding slides (swipeable)
- "Get started" CTA + "Sign in" link

**Recommendation:** Create proper onboarding flow in `app/page.tsx`

#### 2. Win Card / Share Screen
**Current:** May not be implemented
**Design Spec:** Full-screen share card showing:
- Deal logo
- Big gain number ("+$11,000")
- Context (from/to amounts, company, date)
- Share buttons

**Recommendation:** Add `app/sessions/[id]/win/page.tsx`

#### 3. Voice Recording
**Current:** Button exists but functionality is TODO
**Design Spec:**
- Mic button with pulse ring animation when recording
- Transcript fills textarea after 1-2 seconds
- "Listening..." placeholder text
- Timer display

**Recommendation:** Implement OpenAI Whisper API integration

#### 4. Move History (Collapsible)
**Current:** Basic structure exists
**Design Spec:**
- "Previous moves · 3" header (tap to expand)
- Compact move badges + truncated text
- Collapsed by default
- Smooth expand/collapse animation

**Recommendation:** Enhance with full expand/collapse state

## Key Design Principles from Prototype

### Visual Identity
- **Dark, Precise, Alive** - Every pixel serves the negotiation
- **Signal Green (#00E5A0)** - The ONE accent color for primary actions
- **Dark surfaces** - #0A0A0A (ink), #141414 (surface), #1C1C1C (raised)
- **Inter font** - Primary typeface (weights 400, 500, 600)

### Typography Scale
```css
Display:     32–40px, weight 500, tracking -0.03em
Heading 1:   24px, weight 500, tracking -0.02em
Heading 2:   18px, weight 500, tracking -0.015em
Heading 3:   15px, weight 500, tracking -0.01em
Body large:  15px, weight 400, line-height 1.6
Body:        13px, weight 400, line-height 1.6
Caption:     11px, weight 500, tracking 0.04em, UPPERCASE
Mono:        JetBrains Mono 12px (for numbers, codes)
```

### Spacing System
- 4px - micro gap (icon to label)
- 8px - tight (within component)
- 12px - component padding
- 16px - standard padding
- 20px - section gap
- 24px - large section gap
- 32px - page section break

### Border Radius
- 4px - small badges/pills
- 8px - inputs, small cards
- 12px - standard cards (most common)
- 14px - move cards (special)
- 16px - large cards, modals
- 999px - pill buttons

### Move Type Color System
Each move has 3 colors (dot, background, text):

| Move Type | Dot | Background | Text |
|-----------|-----|------------|------|
| ANCHOR | #3B82F6 | #1E3A5F | #60A5FA |
| MIRROR | #8B5CF6 | #2E1A5E | #A78BFA |
| BRIDGE | #06B6D4 | #0F3540 | #67E8F9 |
| QUESTION | #F5A623 | #3A2800 | #FCD34D |
| SILENCE | #6B7280 | #1F2020 | #9CA3AF |
| WALK AWAY | #FF4D4D | #2A0A0A | #FCA5A5 |
| CLOSE | #10B981 | #052E16 | #6EE7B7 |
| TAKE IT | #00E5A0 | #001F14 | #00E5A0 |

### Animation Timing
- Micro: 180ms (button press)
- Default: 320ms (state changes)
- Entrance: 600ms (screen transitions)
- Easing: `cubic-bezier(0.32, 0.72, 0, 1)` (ease-out with slight overshoot)

## How to Use the Prototype

### Local Development
The prototype is in `zucgoo-design-system/project/Deal.html`:

```bash
cd zucgoo-design-system/project
python3 -m http.server 8000
# Open http://localhost:8000/Deal.html
```

### Standalone Version
The standalone version (`Deal (standalone).html`) runs offline - just double-click it.

### Tweaks Panel
Press the floating button to access the design tweaks panel:
- **Signal accent** - Change from mint to blue/amber/purple
- **Move-card glow** - Toggle the subtle shadow
- **Font** - Switch between Inter, Space Grotesk, IBM Plex Sans
- **Tone** - Changes the opening move copy (collaborative/balanced/hardball)

## Implementation Checklist

Use this to verify your implementation matches the design:

### Visual Design
- [ ] All pages use dark background (#0A0A0A)
- [ ] Signal green (#00E5A0) is the only accent color
- [ ] Cards use proper variants (standard/raised/signal/danger)
- [ ] Move badges show correct colors per type
- [ ] All text uses correct hierarchy (see typography scale above)

### Interactive Elements
- [ ] Buttons have active state (scale 0.98)
- [ ] Move cards fade in with translateY animation
- [ ] Live dot pulses continuously
- [ ] Thinking dots animate in sequence
- [ ] Mic button shows pulse ring when recording

### Live Session Screen (Most Important)
- [ ] Live top bar with red pulsing dot
- [ ] Context bar below (goal/floor/offer)
- [ ] Move card dominates the screen
- [ ] "SAY THIS" in green caps
- [ ] Quote text on darker background
- [ ] WHY and WATCH FOR sections
- [ ] Input area fixed at bottom
- [ ] Mic button circular, 52px
- [ ] "Deal closed" (green) / "Walk away" (red) buttons

### Accessibility
- [ ] All touch targets minimum 44x44px
- [ ] Focus rings visible (2px signal green)
- [ ] ARIA labels on icon buttons
- [ ] Keyboard navigation works
- [ ] Respects prefers-reduced-motion

## Next Steps

1. **Review existing implementation** - Your components are already well-built and match the design spec
2. **Test integration** - Connect pages to your backend API
3. **Add missing features**:
   - Onboarding/splash screen
   - Win card / share screen
   - Voice recording (Whisper API)
   - Move history expand/collapse
4. **Polish interactions**:
   - Loading states
   - Error handling
   - Smooth transitions between screens
5. **Test on mobile devices** - The design is mobile-first

## Reference Files

All design source files are in `zucgoo-design-system/project/`:

```
Deal.html              # Main file (loads all below)
deal-tokens.css        # Design tokens
components.jsx         # UI component library
chrome.jsx             # Navigation + demo data
screens-core.jsx       # Splash + Dashboard
screens-setup.jsx      # Setup forms
screens-live.jsx       # Live session (CORE)
screens-end.jsx        # End + debrief + win
app.jsx                # Router + state
```

The standalone version (`Deal (standalone).html`) has everything inlined into one file.

---

**Your implementation is 90% complete!** The design system, components, and pages are all built. Focus on:
1. API integration
2. Voice features
3. Polish & testing
