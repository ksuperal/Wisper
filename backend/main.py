from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routers import auth, sessions, ai, voice, billing

load_dotenv()

app = FastAPI(
    title="LiveCoach API",
    description="Real-Time Negotiation Co-Pilot API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        os.getenv("FRONTEND_URL", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
app.include_router(ai.router, prefix="/sessions", tags=["ai"])
app.include_router(voice.router, prefix="/voice", tags=["voice"])
app.include_router(billing.router, prefix="/billing", tags=["billing"])

@app.get("/")
async def root():
    return {
        "message": "LiveCoach API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}
