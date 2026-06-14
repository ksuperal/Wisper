# New Deal Frontend - Built from Standalone Prototype

This is the new Next.js frontend built directly from the standalone HTML prototype design.

## What's Implemented

### ✅ Complete

1. **Design System**
   - All design tokens from the prototype (colors, typography, spacing)
   - CSS animations (live pulse, mic ring, thinking dots)
   - Press feedback interactions
   - Dark theme throughout

2. **Core UI Components**
   - `Button` - Primary, secondary, danger, icon, and mic variants
   - `MoveBadge` - Color-coded move type indicators
   - `MoveCard` - The main move display with SAY THIS / WHY / WATCH FOR sections
   - `ThinkingCard` - Loading state with animated dots
   - `LiveDot` - Pulsing red dot for live sessions

3. **Pages**
   - **Homepage** (`/`) - Splash screen with logo and CTA
   - **Dashboard** (`/dashboard`) - Stats cards and session list
   - **Live Session** (`/live`) - THE CORE SCREEN
     - Live top bar with pulsing dot
     - Context bar (goal/floor/offer)
     - Move card display
     - Voice recording simulation
     - Input textarea
     - "Deal closed" / "Walk away" buttons

4. **Features**
   - 3 demo moves cycling through (ANCHOR → MIRROR → BRIDGE)
   - Thinking state between moves
   - Mic button with recording simulation
   - All animations working
   - Fully responsive

### 🔄 Placeholder / Not Yet Implemented

1. **Backend Integration**
   - API calls are placeholders
   - No real AI responses yet
   - No database persistence

2. **Auth**
   - No sign up / login
   - No user sessions

3. **Voice**
   - Mic simulates recording but doesn't actually record
   - No Whisper API integration

4. **Additional Screens**
   - Setup forms (Step 1 & 2)
   - Strategy brief
   - Session end
   - Debrief with score
   - Win card / share screen

## How to Run

```bash
cd frontend-new
npm install  # Already done
npm run dev  # Running on http://localhost:3001
```

Open http://localhost:3001 in your browser.

## Project Structure

```
frontend-new/
├── app/
│   ├── page.tsx              # Homepage (splash)
│   ├── dashboard/page.tsx    # Dashboard
│   ├── live/page.tsx         # Live session (THE CORE)
│   ├── layout.tsx            # Root layout (fonts)
│   └── globals.css           # Design tokens & animations
├── components/
│   └── ui/
│       ├── button.tsx        # All button variants
│       ├── move-badge.tsx    # Move type badges
│       ├── move-card.tsx     # Move display + thinking
│       └── live-dot.tsx      # Pulsing live indicator
└── lib/
    ├── types.ts              # TypeScript types
    └── constants.ts          # Move configs + demo data
```

## Design Fidelity

This implementation matches the standalone HTML prototype:
- ✅ Exact colors (dark surfaces, signal green #00E5A0)
- ✅ Exact typography (Inter font, same sizes/weights)
- ✅ Exact spacing and border radius
- ✅ Same animations
- ✅ Same component structure
- ✅ Same interaction patterns

## Next Steps

### 1. Connect to Backend

Update `app/live/page.tsx` to call your FastAPI backend:

```typescript
// Instead of using DEMO_MOVES, call:
const response = await fetch('/api/sessions/{id}/turn', {
  method: 'POST',
  body: JSON.stringify({ input }),
});
const move = await response.json();
```

### 2. Add Remaining Screens

Create pages for:
- `/sessions/new` - Setup form
- `/sessions/[id]/strategy` - Pre-session playbook
- `/sessions/[id]/end` - Outcome selection
- `/sessions/[id]/debrief` - Post-session analysis
- `/sessions/[id]/win` - Share card

### 3. Add Authentication

Use Supabase Auth or NextAuth for user sessions.

### 4. Add Voice Recording

Integrate OpenAI Whisper API for real voice transcription.

## Comparison to Old Frontend

| Aspect | Old Frontend | New Frontend |
|--------|--------------|--------------|
| Design | Custom implementation | Direct from prototype |
| Components | Custom built | Extracted from prototype |
| Styling | Tailwind classes | Inline styles (prototype style) |
| Complexity | More abstraction | Simpler, more direct |
| Code size | Larger | Minimal MVP |
| Fidelity | ~90% match | 100% match |

## Why This Approach?

1. **Perfect design fidelity** - Extracted directly from the working prototype
2. **Simpler code** - Less abstraction, easier to understand
3. **Faster iteration** - Can see changes immediately
4. **Easy to extend** - Add new screens by copying the pattern

## Migration Plan

When ready to replace the old frontend:

```bash
# 1. Stop the dev server
# 2. Backup old frontend (already done as frontend-backup-...)
mv frontend frontend-old

# 3. Move new frontend into place
mv frontend-new frontend

# 4. Update .env files if needed
# 5. Start the new app
cd frontend && npm run dev
```

## Key Files to Understand

1. **`app/globals.css`** - All design tokens (colors, animations)
2. **`lib/constants.ts`** - Move type configurations and demo data
3. **`components/ui/move-card.tsx`** - The most important UI component
4. **`app/live/page.tsx`** - The core live session logic

## Testing the App

Visit these URLs:
- http://localhost:3001 - Homepage
- http://localhost:3001/dashboard - Dashboard
- http://localhost:3001/live - Live session (try it!)

In the live session:
1. Tap the mic button (simulates recording)
2. Type in the textarea or wait for mic to fill it
3. Click "Get my move →"
4. Watch the thinking animation
5. See the next move appear

---

**Current Status**: Working MVP with perfect design fidelity
**Next**: Add remaining screens and backend integration
