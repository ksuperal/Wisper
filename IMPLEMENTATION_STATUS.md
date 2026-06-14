# Deal App - What's Left to Implement

## Current Status

### ✅ **FRONTEND: 100% Complete**
- All 8 screens built and functional
- All UI components working
- Complete navigation flow
- Design system fully implemented
- Demo data in place for testing
- Running on `http://localhost:3001`

### ⚠️ **BACKEND: 90% Built, Needs Integration**
- FastAPI server structure exists
- All endpoints defined
- Claude API integration code written
- Supabase/database code written
- **BUT:** Not connected to frontend yet

---

## What's Left to Make It Fully Functional

### 1. **API Client Library** (Frontend)
**Status:** Missing
**Priority:** HIGH
**Effort:** 2-3 hours

Need to create `frontend-new/lib/api.ts` to handle all API calls:

```typescript
// What needs to be built:
- createSession(data) → POST /sessions
- getSession(id) → GET /sessions/:id
- generateStrategy(sessionId) → POST /sessions/:id/strategy
- getNextMove(sessionId, input) → POST /sessions/:id/turn
- endSession(sessionId, outcome) → PATCH /sessions/:id
- generateDebrief(sessionId, outcome) → POST /sessions/:id/debrief
- getUserSessions() → GET /sessions
```

### 2. **Environment Configuration** (Frontend)
**Status:** Missing
**Priority:** HIGH
**Effort:** 15 minutes

Create `.env.local` in `frontend-new/`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Update `next.config.js` if needed for API proxy.

### 3. **Replace Demo Data with API Calls** (Frontend)
**Status:** Not started
**Priority:** HIGH
**Effort:** 4-5 hours

**Pages that need API integration:**

#### `/sessions/new/step-2/page.tsx`
- Replace setTimeout simulation
- Call `createSession()` API
- Store returned session ID
- Navigate to `/sessions/{id}/strategy`

#### `/sessions/[id]/strategy/page.tsx`
- Call `generateStrategy(sessionId)` on page load
- Display real strategy data (opening move, target range, leverage points)
- Loading state while strategy generates

#### `/live/page.tsx` ⚡ **CORE FEATURE**
- Remove mock move cycling
- Call `getNextMove(sessionId, userInput)` when user types
- Display real AI-generated moves
- Handle conversation context/history
- Real-time turn counter from API

#### `/sessions/[id]/end/page.tsx`
- Call `endSession(sessionId, outcomeData)` on submit
- Store outcome in database

#### `/sessions/[id]/debrief/page.tsx`
- Call `generateDebrief(sessionId)` on page load
- Display real AI analysis, score, strengths, improvements
- Loading state (currently simulated)

#### `/dashboard/page.tsx`
- Call `getUserSessions()` on page load
- Display real session list instead of DEMO_SESSIONS
- Calculate real stats from API data

### 4. **Backend Environment Setup**
**Status:** Needs configuration
**Priority:** HIGH
**Effort:** 30 minutes

Create `.env` in `backend/`:
```bash
# Required API Keys
ANTHROPIC_API_KEY=your_claude_api_key
OPENAI_API_KEY=your_whisper_api_key (if using voice)

# Database
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001
```

### 5. **Start Backend Server**
**Status:** Not running
**Priority:** HIGH
**Effort:** 5 minutes

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend will run on `http://localhost:8000`

### 6. **Database Schema Setup** (Supabase)
**Status:** SQL exists but not deployed
**Priority:** HIGH
**Effort:** 30 minutes

The schema exists in `database/schema.sql`. Need to:
1. Create Supabase project (or use local PostgreSQL)
2. Run the schema SQL to create tables:
   - `users`
   - `sessions`
   - `turns`
   - `debrief`
3. Set up Row Level Security (RLS) policies
4. Add database URL to backend `.env`

### 7. **Authentication** (Optional for MVP)
**Status:** Backend code exists, frontend needs integration
**Priority:** MEDIUM (can skip for testing)
**Effort:** 3-4 hours

Currently hardcoded as `user_id: "test-user"`. To make it real:
- Integrate Supabase Auth in frontend
- Add auth context provider
- Protected routes
- Login/signup screens
- Pass auth tokens to API

**Can skip this initially** - backend already has test user fallback.

### 8. **Voice Transcription** (Optional for MVP)
**Status:** Backend code exists, frontend needs integration
**Priority:** LOW (not needed for MVP)
**Effort:** 2-3 hours

Current mic button is simulated. To make it real:
- Record audio in browser
- Send to `/voice/transcribe` endpoint
- Display transcription in textarea
- Can use text input for MVP testing

### 9. **Error Handling & Loading States**
**Status:** Partial
**Priority:** MEDIUM
**Effort:** 2-3 hours

Add to each API call:
- Error boundaries
- Network error messages
- Retry logic
- Better loading states (currently some are simulated)

### 10. **TypeScript Types for API**
**Status:** Backend types exist, need frontend types
**Priority:** MEDIUM
**Effort:** 1 hour

Create `frontend-new/lib/api-types.ts` matching backend models:
```typescript
interface SessionCreate { /* ... */ }
interface SessionResponse { /* ... */ }
interface MoveResponse { /* ... */ }
interface DebriefResponse { /* ... */ }
```

---

## Implementation Checklist

### Phase 1: Core Integration (MVP) ⚡
**Goal:** Get basic flow working end-to-end
**Time:** ~1 day

- [ ] Set up backend environment variables
- [ ] Start backend server
- [ ] Set up database (Supabase or local)
- [ ] Create API client library in frontend
- [ ] Connect setup flow to create session API
- [ ] Connect strategy page to generate strategy API
- [ ] Connect live session to get next move API (**CORE**)
- [ ] Connect debrief to generate debrief API
- [ ] Test complete flow: setup → strategy → live → debrief

### Phase 2: Full Features
**Time:** ~2-3 days

- [ ] Connect dashboard to list sessions API
- [ ] Add proper error handling
- [ ] Add authentication (optional)
- [ ] Add voice transcription (optional)
- [ ] Settings page
- [ ] Profile page
- [ ] Share win card functionality
- [ ] Real-time updates during live session

### Phase 3: Polish
**Time:** ~1-2 days

- [ ] Loading state improvements
- [ ] Error message UX
- [ ] Offline handling
- [ ] Performance optimization
- [ ] Mobile testing
- [ ] Production deployment

---

## Quick Start Guide (To Make It Work Today)

### Step 1: Backend Setup (15 minutes)
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
ANTHROPIC_API_KEY=your_key_here
SUPABASE_URL=your_url_here
SUPABASE_KEY=your_key_here
FRONTEND_URL=http://localhost:3001
EOF

# Start server
uvicorn main:app --reload --port 8000
```

### Step 2: Database Setup (10 minutes)
```bash
# Go to Supabase.com, create project
# Copy SQL from database/schema.sql
# Paste into Supabase SQL Editor
# Run migration
# Copy connection details to backend .env
```

### Step 3: Frontend API Client (30 minutes)
```bash
cd frontend-new

# Create API client
touch lib/api.ts

# Add fetch calls to all backend endpoints
# Use NEXT_PUBLIC_API_URL environment variable
```

### Step 4: Connect Pages (2-3 hours)
Replace demo data with API calls in:
1. Setup pages → `createSession()`
2. Strategy page → `generateStrategy()`
3. Live page → `getNextMove()` ⚡ **CRITICAL**
4. Debrief page → `generateDebrief()`
5. Dashboard → `getUserSessions()`

### Step 5: Test (30 minutes)
1. Visit `http://localhost:3001`
2. Complete setup flow
3. Generate strategy
4. Start live session
5. Get AI coaching
6. End session
7. View debrief

---

## Current Blockers

### Must Have (Can't work without):
1. ❌ Backend environment variables (API keys)
2. ❌ Database running (Supabase or local)
3. ❌ Backend server started
4. ❌ Frontend API client library
5. ❌ API calls in frontend pages

### Nice to Have (Can skip for MVP):
- Authentication (using test user for now)
- Voice transcription (can type instead)
- Share functionality
- Settings/Profile pages

---

## Estimated Time to Full Functionality

**MVP (Core features working):** 6-8 hours
- Backend setup: 1 hour
- Database setup: 30 min
- Frontend API client: 1 hour
- Connect all pages: 3-4 hours
- Testing & fixes: 1-2 hours

**Full Production:** 4-5 days
- MVP: 1 day
- Auth integration: 1 day
- Voice, settings, polish: 2-3 days

---

## Summary

**Frontend:** ✅ Done
**Backend:** ✅ Code exists
**Database:** ⚠️ Schema exists, needs deployment
**Integration:** ❌ **This is what's missing**

The app is like a car with all the parts built separately. The frontend is the body, the backend is the engine, the database is the fuel tank. They just need to be **connected together** with API calls.

**Next immediate step:** Create the API client library and start connecting the pages to the backend endpoints.
