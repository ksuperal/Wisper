# Deal - Negotiation Co-Pilot

> **Status:** ✅ Frontend implementation 100% complete

A real-time negotiation coaching app that tells you exactly what to say, move by move. Built with Next.js 14, TypeScript, and the Deal Design System.

## 🎯 What's This?

This is the **complete frontend implementation** of the Deal app prototype. All screens, components, and flows from the standalone HTML design have been built and are ready for backend integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit: **http://localhost:3001**

## ✨ Features

### Complete User Journey
1. **Onboarding** - 3-slide carousel introducing the app
2. **Dashboard** - Stats, recent sessions, and quick start CTA
3. **Setup Flow** - 2-step negotiation setup (situation + leverage)
4. **Strategy Brief** - AI-generated playbook with opening move
5. **Live Session** - Real-time coaching with move cards
6. **Session End** - Outcome selection and emotional reflection
7. **Debrief** - Detailed analysis with score and insights
8. **Win Card** - Shareable victory card

### UI Components (20+)
- Buttons (5 variants)
- Move badges (8 move types)
- Move cards (SAY THIS/WHY/WATCH layout)
- Form inputs (text, textarea, pills)
- Cards (4 variants)
- Animated indicators (live dot, score bar, mic ring)
- Navigation (top bar, tab bar, bottom sheet)
- And more...

## 📁 Project Structure

```
app/
├── page.tsx                    # Homepage with onboarding
├── dashboard/page.tsx          # Dashboard
├── live/page.tsx              # Live session
└── sessions/
    ├── new/                   # Setup flow (2 steps)
    └── [id]/                  # Session pages (strategy, end, debrief, win)

components/
├── ui/                        # 16 UI components
├── layout/                    # 5 layout components
└── screens/                   # 3 screen components

lib/
├── types.ts                   # TypeScript types
└── constants.ts               # Demo data & configs
```

## 🎨 Design System

### CSS Variables
All design tokens are defined in `app/globals.css`:

```css
--deal-ink: #0A0A0A              /* Background */
--deal-signal: #00E5A0            /* Primary green */
--deal-warn: #F5A623              /* Warnings */
--deal-danger: #FF4D4D            /* Danger */
```

### Typography
- **Primary:** Inter (400, 500, 600, 700)
- **Mono:** JetBrains Mono

### Animations
- Live pulse (red dot)
- Mic ring (recording indicator)
- Thinking dots (AI processing)
- Score bar count-up

## 🔄 Data Flow

### SessionStorage
Multi-step forms persist data between pages:
- `setupData` - Step 1 form data
- `fullSetupData` - Combined step 1 + 2
- `sessionEndData` - Session outcome

### Demo Data
All screens use mock data from `lib/constants.ts`:
- `DEMO_SESSIONS` - Example sessions
- `DEMO_USER` - User profile
- `DEMO_STATS` - Dashboard stats
- `DEMO_MOVES` - Sample negotiation moves

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with 3-slide onboarding |
| `/dashboard` | Main dashboard with stats & sessions |
| `/sessions/new` | Setup step 1: The situation |
| `/sessions/new/step-2` | Setup step 2: Your leverage |
| `/sessions/[id]/strategy` | Strategy brief & playbook |
| `/live` | Live negotiation session |
| `/sessions/[id]/end` | Session end & outcome |
| `/sessions/[id]/debrief` | Debrief with score & insights |
| `/sessions/[id]/win` | Shareable win card |

## 🔧 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS-in-JS (inline styles)
- **Fonts:** Google Fonts (Inter, JetBrains Mono)
- **State:** React hooks + sessionStorage
- **Icons:** Custom SVG components

## 📄 Documentation

- **[IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)** - Full implementation details
- **[IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)** - Original planning doc
- **[DESIGN_IMPLEMENTATION.md](./DESIGN_IMPLEMENTATION.md)** - Design system mapping

## 🔮 Next Steps

The frontend is complete and ready for backend integration:

1. Replace demo data with real API calls
2. Connect to Claude API for AI coaching
3. Integrate Whisper API for voice transcription
4. Add Supabase authentication
5. Connect to PostgreSQL database
6. Implement real-time session features
7. Add share functionality for win cards
8. Build settings & profile pages

## 🏗️ Backend

The backend exists at `../backend/` with:
- FastAPI server
- Claude API integration
- Whisper API integration
- Supabase client
- PostgreSQL schema

**Note:** Backend needs simplification per project requirements.

## 📝 Development Notes

- All styles use inline CSS (matching prototype pattern)
- No Tailwind utility classes
- TypeScript for type safety
- Mobile-first responsive design
- iOS safe area support
- sessionStorage for form state persistence
- Demo data allows testing without backend

## 🎯 Completion Status

**Frontend:** 100% complete ✅
- All 8 screens implemented
- All UI components built
- All animations working
- Complete navigation flow
- Data persistence between steps
- Loading states & simulations
- Pixel-perfect to design

**Backend Integration:** 0% (ready to start)

---

**Built with** ❤️ **using Next.js, TypeScript, and the Deal Design System**

For questions or issues, see the documentation in the project root.
