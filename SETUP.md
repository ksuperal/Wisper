# LiveCoach - Complete Setup Guide

This guide will walk you through setting up LiveCoach from scratch.

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- Supabase account (free tier works)
- Anthropic API key (Claude)
- OpenAI API key (for Whisper voice transcription)
- Stripe account (for payments)

## Step-by-Step Setup

### 1. Database Setup (Supabase)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for project to finish provisioning (~2 minutes)
3. Go to **SQL Editor** in the Supabase dashboard
4. Create a new query and paste the entire contents of `database_schema.sql`
5. Run the query - it will create all tables, indexes, and security policies
6. Go to **Project Settings** → **API** and copy:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key (keep this secure!)

### 2. API Keys Setup

#### Anthropic Claude API
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Go to **API Keys** and create a new key
4. Copy the key (starts with `sk-ant-`)

#### OpenAI (Whisper)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Go to **API Keys** and create a new key
4. Copy the key (starts with `sk-`)

#### Stripe
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create an account or sign in
3. Make sure you're in **Test Mode** (toggle in top right)
4. Go to **Developers** → **API Keys**
5. Copy:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)
6. Go to **Developers** → **Webhooks** → **Add endpoint**
   - Endpoint URL: `http://your-backend-url/billing/webhook`
   - Events: Select `checkout.session.completed` and `customer.subscription.deleted`
   - Copy the webhook secret (starts with `whsec_`)

### 3. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env file with your actual keys
# Use your favorite text editor (nano, vim, VS Code, etc.)
nano .env
```

**Fill in your .env file:**
```bash
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
OPENAI_API_KEY=sk-your-actual-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
STRIPE_SECRET_KEY=sk_test_your-key-here
STRIPE_WEBHOOK_SECRET=whsec_your-secret-here
STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here
FRONTEND_URL=http://localhost:3000
APP_URL=http://localhost:8000
```

**Start the backend:**
```bash
uvicorn main:app --reload
```

The backend will start on `http://localhost:8000`

Test it: Open http://localhost:8000/health in your browser - you should see `{"status":"healthy"}`

### 4. Frontend Setup

```bash
# Open a NEW terminal window
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local with your keys
nano .env.local
```

**Fill in your .env.local file:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Start the frontend:**
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### 5. Test the App

1. Open http://localhost:3000 in your browser
2. You should see the LiveCoach landing page
3. Click "Start Free" to test the signup flow

## Troubleshooting

### Backend won't start

**Error: "No module named 'fastapi'"**
- Make sure you activated the virtual environment: `source venv/bin/activate`
- Run `pip install -r requirements.txt` again

**Error: "pydantic_core._pydantic_core.ValidationError"**
- Check that all required environment variables are set in `.env`
- Make sure there are no spaces around the `=` signs in `.env`

### Frontend won't start

**Error: "Module not found"**
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then `npm install` again

**Error: "Invalid Supabase URL"**
- Check that `.env.local` has correct Supabase URL
- URL should start with `https://` and end with `.supabase.co`

### Database connection fails

- Verify Supabase project is running (check dashboard)
- Verify you're using the correct project URL and keys
- Make sure you ran the `database_schema.sql` file

### Claude API errors

**Error: "401 Unauthorized"**
- Check your `ANTHROPIC_API_KEY` is correct
- Make sure it starts with `sk-ant-`
- Verify you have credits in your Anthropic account

## Next Steps

Once everything is running:

1. **Create a test negotiation:**
   - Go to http://localhost:3000
   - Sign up for an account
   - Create a new session
   - Test the live coaching feature

2. **Check the database:**
   - Go to Supabase dashboard
   - Click "Table Editor"
   - You should see your sessions and turns

3. **Monitor API usage:**
   - Anthropic Console: see Claude API calls
   - OpenAI Dashboard: see Whisper usage
   - Supabase: see database queries

## Development Tips

- **Backend logs:** The terminal running `uvicorn` shows all API requests
- **Frontend logs:** Check the browser console (F12) for errors
- **Database queries:** Use Supabase SQL Editor to inspect data
- **Test payments:** Use Stripe test cards (4242 4242 4242 4242)

## Cost Estimates

**Development (with test data):**
- Supabase: Free (up to 500MB database)
- Anthropic: ~$0.01 per negotiation session
- OpenAI Whisper: ~$0.006 per minute of audio
- Stripe: Free in test mode

**Production (1000 users, 500 sessions/month):**
- Hosting: ~$20/month (Vercel + Railway)
- Supabase: Free tier or $25/month (Pro)
- Claude API: ~$150/month
- Whisper API: ~$30/month
- Total: ~$200-225/month

## Security Notes

- **Never commit `.env` or `.env.local` files** - they contain secrets!
- **Use different keys for production** - create new API keys when deploying
- **Enable Row Level Security** - already configured in database schema
- **Use HTTPS in production** - required for Stripe payments

## Getting Help

If you're stuck:
1. Check this guide again carefully
2. Read the error message - it usually tells you what's wrong
3. Check the README.md for additional context
4. Review the code comments in the source files

---

**You're all set!** The app should now be running locally. Time to test it out!
