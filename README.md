# LiveCoach - Real-Time Negotiation Co-Pilot

A mobile-first web app that provides real-time AI coaching during negotiations (salary, rent, contracts, vendor deals). Get your exact next move, word-for-word, in under 2 seconds.

## Project Structure

```
Wisper/
├── frontend/          # Next.js 14 web app
├── backend/           # FastAPI Python backend
└── database_schema.sql # Supabase database schema
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **Authentication**: Supabase Auth
- **Payments**: Stripe

### Backend
- **Framework**: FastAPI (Python)
- **AI**: Anthropic Claude API (Sonnet 4)
- **Voice**: OpenAI Whisper API
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe

## Quick Start

### 1. Setup Database

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL in `database_schema.sql` in your Supabase SQL editor
3. Copy your Supabase URL and keys

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Edit .env with your API keys
# - ANTHROPIC_API_KEY (get from console.anthropic.com)
# - OPENAI_API_KEY (get from platform.openai.com)
# - SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
# - STRIPE keys (get from dashboard.stripe.com)

# Run the server
uvicorn main:app --reload
```

Backend will run on `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your keys
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# - NEXT_PUBLIC_API_URL=http://localhost:8000

# Run the dev server
npm run dev
```

Frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)
```bash
# Required
ANTHROPIC_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-xxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Optional
STRIPE_PRO_MONTHLY_PRICE_ID=price_xxx
STRIPE_PRO_YEARLY_PRICE_ID=price_xxx
STRIPE_SESSION_PRICE_ID=price_xxx
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Endpoints

### Auth
- `POST /auth/signup` - Create new user
- `POST /auth/login` - Login
- `POST /auth/google` - Google OAuth
- `GET /auth/me` - Get current user

### Sessions
- `POST /sessions` - Create negotiation session
- `GET /sessions` - List user sessions
- `GET /sessions/{id}` - Get session details
- `PATCH /sessions/{id}` - Update session
- `DELETE /sessions/{id}` - Delete session

### AI (Core)
- `POST /sessions/{id}/strategy` - Generate pre-session strategy
- `POST /sessions/{id}/turn` - Get next tactical move (main endpoint)
- `GET /sessions/{id}/turns` - Get conversation history
- `POST /sessions/{id}/debrief` - Generate post-session report
- `GET /sessions/{id}/debrief` - Get debrief

### Voice
- `POST /voice/transcribe` - Transcribe audio to text

### Billing
- `GET /billing/plans` - List pricing plans
- `POST /billing/checkout` - Create Stripe checkout
- `POST /billing/portal` - Customer portal
- `POST /billing/webhook` - Stripe webhooks

## Key Features

### Phase 1 (MVP) ✅
- ✅ User authentication with Supabase
- ✅ Session setup and configuration
- ✅ Real-time AI coaching with Claude
- ✅ Live session screen
- ✅ Post-session debrief
- ✅ Session history
- 🚧 Stripe payment integration
- 🚧 Landing page and UI polish

### Phase 2 (Planned)
- Voice input (Whisper integration)
- Win/loss tracking
- Shareable win cards
- Referral system

### Phase 3 (Future)
- Passive listening mode
- Mobile apps (iOS/Android)
- Team/enterprise features
- Multi-language support

## How It Works

1. **Setup**: User creates a session and inputs context (goal, current offer, walk-away point, leverage)
2. **Strategy**: AI generates opening playbook with tactics and likely counter-moves
3. **Live Session**: User types what other side said → AI returns ONE tactical move with exact words to say
4. **Completion**: User marks outcome → AI generates detailed debrief with score and learnings

## Core AI Prompting

The system prompt trains Claude to be a decisive negotiation coach that:
- Gives ONE move at a time (never multiple options)
- Provides EXACT words to say
- Explains WHY the tactic works
- Tells user WHAT to watch for in response

Move types: SILENCE, ANCHOR, MIRROR, LABEL, CALIBRATED QUESTION, BRIDGE, DEADLINE, COMPETING OFFER, FLINCH, NIBBLE, WALK AWAY, TAKE IT

## Development

### Testing the API
```bash
# Backend must be running
curl http://localhost:8000/health

# Create a test session
curl -X POST http://localhost:8000/sessions \
  -H "Content-Type: application/json" \
  -d '{"type":"salary","goal":"$100k","walk_away":"$85k","style":"balanced"}'
```

### Database Access
- Access Supabase dashboard at your project URL
- Use SQL Editor for queries
- Table Editor for data inspection
- Auth section for user management

## Deployment

### Backend (Railway/Render)
1. Connect GitHub repo
2. Select `backend` folder
3. Add environment variables
4. Deploy

### Frontend (Vercel)
1. Connect GitHub repo
2. Root directory: `frontend`
3. Framework: Next.js
4. Add environment variables
5. Deploy

### Database (Supabase)
Already hosted - no deployment needed

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact: [your email]

---

**Current Status**: MVP in development
**Target Launch**: 8 weeks from project start
**Estimated Monthly Cost**: $50-100 (API usage + hosting)
