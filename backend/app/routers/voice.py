from fastapi import APIRouter, UploadFile, File, HTTPException
from openai import OpenAI
from app.config import settings

router = APIRouter()

# Initialize OpenAI client
client = OpenAI(api_key=settings.openai_api_key)

@router.post("/transcribe")
async def transcribe_audio(audio: UploadFile = File(...)):
    """Transcribe audio using Whisper API"""
    try:
        # Read audio file
        audio_data = await audio.read()

        # Save temporarily (Whisper needs a file path)
        import tempfile
        import os

        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_file:
            temp_file.write(audio_data)
            temp_file_path = temp_file.name

        try:
            # Transcribe using Whisper
            with open(temp_file_path, "rb") as audio_file:
                transcript = client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    language="en"
                )

            return {"text": transcript.text}

        finally:
            # Clean up temp file
            os.unlink(temp_file_path)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")
