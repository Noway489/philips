# config.py

import os
from dotenv import load_dotenv

# Load environment variables from .env file (in project root)
load_dotenv()

class Config:
    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask environment: "development" or "production"
    ENV = os.getenv("FLASK_ENV", "production")

    # Secret key for session signing, CSRF protection, etc.
    SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production")

    # Gemini API key (for question generation)
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    # CORS: comma-separated allowed origins → list
    _origins = os.getenv("CORS_ALLOWED_ORIGINS", "")
    CORS_ALLOWED_ORIGINS = [o.strip() for o in _origins.split(",") if o.strip()]

    # (Optional) Hugging Face cache directory
    HF_HOME = os.getenv("HF_HOME", None)
