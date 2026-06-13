-- LiveCoach Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    plan TEXT DEFAULT 'free',
    sessions_used INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    stripe_customer_id TEXT
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- salary, rent, contract, vendor, other
    status TEXT DEFAULT 'setup', -- setup, live, completed, abandoned
    goal TEXT,
    opening_offer TEXT,
    walk_away TEXT,
    leverage TEXT,
    pressure TEXT,
    style TEXT DEFAULT 'balanced', -- collaborative, balanced, hardball
    outcome TEXT,
    outcome_amount TEXT,
    score FLOAT,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Turns table
CREATE TABLE IF NOT EXISTS turns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    turn_number INTEGER NOT NULL,
    user_input TEXT NOT NULL,
    move_type TEXT NOT NULL,
    ai_line TEXT NOT NULL,
    ai_why TEXT NOT NULL,
    ai_watch TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Debrief table
CREATE TABLE IF NOT EXISTS debrief (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE UNIQUE,
    score FLOAT NOT NULL,
    what_worked TEXT[] DEFAULT '{}',
    improve_next TEXT[] DEFAULT '{}',
    their_tactics TEXT[] DEFAULT '{}',
    outcome_analysis TEXT,
    full_report TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_turns_session_id ON turns(session_id);
CREATE INDEX IF NOT EXISTS idx_turns_turn_number ON turns(turn_number);
CREATE INDEX IF NOT EXISTS idx_debrief_session_id ON debrief(session_id);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE debrief ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Sessions policies
CREATE POLICY "Users can view own sessions" ON sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON sessions
    FOR DELETE USING (auth.uid() = user_id);

-- Turns policies
CREATE POLICY "Users can view own session turns" ON turns
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM sessions
            WHERE sessions.id = turns.session_id
            AND sessions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create turns in own sessions" ON turns
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM sessions
            WHERE sessions.id = turns.session_id
            AND sessions.user_id = auth.uid()
        )
    );

-- Debrief policies
CREATE POLICY "Users can view own session debriefs" ON debrief
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM sessions
            WHERE sessions.id = debrief.session_id
            AND sessions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create debriefs for own sessions" ON debrief
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM sessions
            WHERE sessions.id = debrief.session_id
            AND sessions.user_id = auth.uid()
        )
    );
