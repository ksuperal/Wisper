# LiveCoach - Quick Start Guide

Welcome to LiveCoach! This guide will help you get the app running in under 10 minutes.

## What You'll Need

- Node.js 18+ and npm
- Python 3.9+
- Anthropic API key (for Claude AI)
- Supabase account (free tier works) OR local PostgreSQL

## Two Modes of Operation

LiveCoach can run in two modes:

1. **Demo Mode** - Frontend only, uses mock data (great for UI testing)
2. **Full Mode** - Frontend + Backend with real AI coaching

## Option 1: Demo Mode (Fastest - 2 minutes)

Perfect for testing the UI without setting up the backend.

```bash
cd frontend-new
npm install
npm run dev
```

Visit `http://localhost:3000` - the app will work with demo data!

## Option 2: Full Mode with Backend (10 minutes)

### Step 1: Start the Frontend

```bash
cd frontend-new

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start the dev server
npm run dev
```

Frontend will run on `http://localhost:3000`

### Step 2: Set Up Database

**Option A: Supabase (Recommended)**

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Copy the SQL from `backend/database_schema.sql`
4. In Supabase, go to SQL Editor and run the schema
5. Note down:
   - Project URL (looks like `https://xxx.supabase.co`)
   - Anon/Public Key (from Settings > API)

**Option B: Local PostgreSQL**

```bash
# Install PostgreSQL if needed
# Then create database
createdb livecoach

# Run schema
psql livecoach < backend/database_schema.sql
```

### Step 3: Configure Backend

```bash
cd backend

# Create environment file
cat > .env << EOF
# AI Service
ANTHROPIC_API_KEY=your_anthropic_key_here

# Database (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key_here

# OR Database (Local PostgreSQL)
# DATABASE_URL=postgresql://user:pass@localhost/livecoach

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
EOF
```

### Step 4: Start Backend

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

Backend will run on `http://localhost:8000`

### Step 5: Test It!

1. Visit `http://localhost:3000`
2. Click "Start new session"
3. Fill out the setup form
4. Generate strategy (uses real AI!)
5. Start live session and get coaching
6. Complete session and view debrief

## Getting Your API Keys

### Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to API Keys section
4. Create a new key
5. Copy it to your backend `.env` file

### Supabase Credentials

1. In your Supabase project dashboard
2. Go to Settings > API
3. Copy the URL and anon key
4. Add them to backend `.env`

## Troubleshooting

### "Backend not available" message

The frontend will show this and fall back to demo mode if:
- Backend is not running
- Wrong API URL in `.env.local`
- CORS issues (check backend `.env` has correct FRONTEND_URL)

To fix: Check backend is running on port 8000 and `.env` is configured.

### Database connection errors

Common causes:
- Wrong Supabase URL/key in `.env`
- Schema not created (run the SQL file)
- Network issues

To fix: Double-check your credentials and ensure schema is deployed.

### AI not responding

Check:
- Valid Anthropic API key in backend `.env`
- API key has credits
- Check backend logs for errors

## Project Structure

```
Wisper/
├── frontend-new/          # Next.js frontend
│   ├── app/              # Pages and routes
│   ├── components/       # UI components
│   ├── lib/              # API client and utilities
│   └── .env.local        # Frontend config
│
├── backend/              # FastAPI backend
│   ├── app/              # API routes and services
│   ├── main.py           # Server entry point
│   ├── requirements.txt  # Python dependencies
│   └── .env              # Backend config (create this)
│
└── database_schema.sql   # Database schema
```

## Next Steps

- **Customize prompts**: Edit `backend/app/prompts/` to adjust AI behavior
- **Add authentication**: Integrate Supabase Auth (code is ready)
- **Deploy**: See `DEPLOYMENT.md` for production deployment guide
- **Contribute**: Check `IMPLEMENTATION_STATUS.md` for features to add

## Need Help?

- Check `IMPLEMENTATION_STATUS.md` for known issues
- Review backend logs: backend server shows detailed errors
- Frontend console: Open browser DevTools to see API errors

## What Works Without Backend

These features work in demo mode (no backend needed):
- ✅ All UI screens and navigation
- ✅ Setup form (stores in sessionStorage)
- ✅ Strategy page (shows demo strategy)
- ✅ Live session (cycles through demo moves)
- ✅ Session end and debrief (shows demo analysis)
- ✅ Dashboard (shows demo sessions)

## What Requires Backend

These features need the backend running:
- ❌ Real AI strategy generation
- ❌ Live AI coaching responses
- ❌ Personalized debrief analysis
- ❌ Session persistence (saving to database)
- ❌ Session history across page refreshes
- ❌ Voice transcription (optional)

## Performance Tips

- Frontend: Uses React Server Components for fast initial load
- Backend: FastAPI is async for handling multiple users
- Database: Indexed for fast queries
- AI: Responses typically take 2-3 seconds

Enjoy using LiveCoach! 🚀
