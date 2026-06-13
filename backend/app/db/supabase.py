from supabase import create_client, Client
from app.config import settings

# Initialize Supabase client
supabase: Client = create_client(
    settings.supabase_url,
    settings.supabase_service_role_key
)

# Database query functions

async def get_user_by_id(user_id: str):
    """Get user by ID"""
    response = supabase.table('users').select('*').eq('id', user_id).single().execute()
    return response.data

async def get_user_by_email(email: str):
    """Get user by email"""
    response = supabase.table('users').select('*').eq('email', email).single().execute()
    return response.data

async def create_user(user_data: dict):
    """Create a new user"""
    response = supabase.table('users').insert(user_data).execute()
    return response.data[0] if response.data else None

async def update_user(user_id: str, updates: dict):
    """Update user data"""
    response = supabase.table('users').update(updates).eq('id', user_id).execute()
    return response.data[0] if response.data else None

# Session queries

async def create_session(session_data: dict):
    """Create a new negotiation session"""
    response = supabase.table('sessions').insert(session_data).execute()
    return response.data[0] if response.data else None

async def get_session(session_id: str):
    """Get session by ID"""
    response = supabase.table('sessions').select('*').eq('id', session_id).single().execute()
    return response.data

async def get_user_sessions(user_id: str):
    """Get all sessions for a user"""
    response = supabase.table('sessions').select('*').eq('user_id', user_id).order('created_at', desc=True).execute()
    return response.data

async def update_session(session_id: str, updates: dict):
    """Update session data"""
    response = supabase.table('sessions').update(updates).eq('id', session_id).execute()
    return response.data[0] if response.data else None

async def delete_session(session_id: str):
    """Delete a session"""
    response = supabase.table('sessions').delete().eq('id', session_id).execute()
    return response.data

# Turn queries

async def create_turn(turn_data: dict):
    """Create a new turn in a session"""
    response = supabase.table('turns').insert(turn_data).execute()
    return response.data[0] if response.data else None

async def get_session_turns(session_id: str):
    """Get all turns for a session"""
    response = supabase.table('turns').select('*').eq('session_id', session_id).order('turn_number', desc=False).execute()
    return response.data

# Debrief queries

async def create_debrief(debrief_data: dict):
    """Create session debrief"""
    response = supabase.table('debrief').insert(debrief_data).execute()
    return response.data[0] if response.data else None

async def get_session_debrief(session_id: str):
    """Get debrief for a session"""
    response = supabase.table('debrief').select('*').eq('session_id', session_id).single().execute()
    return response.data
