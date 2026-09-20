import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv()

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"
MODELS_DIR = BASE_DIR / "models"

# Ensure directories exist
RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)
MODELS_DIR.mkdir(parents=True, exist_ok=True)

# API Keys & Configurations
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
MODEL_PATH = MODELS_DIR / "risk_model.pkl"