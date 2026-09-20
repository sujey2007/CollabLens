"""
firestore_client.py
--------------------
Handles initialization of the Firebase Admin SDK and exposes a Firestore
client instance used by the CollabLens FastAPI backend.

Setup:
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore in Native mode.
3. Generate a service account key: Project Settings > Service Accounts >
   Generate New Private Key. Save it as `serviceAccountKey.json` inside
   the `backend/` directory (this file is gitignored by default).
4. Alternatively, set the GOOGLE_APPLICATION_CREDENTIALS environment
   variable to point at the key file, or set FIREBASE_CREDENTIALS_JSON
   with the raw JSON contents (useful for deployment secrets).
"""

import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

load_dotenv()

_db = None


def init_firestore():
    """Initializes the Firebase app exactly once and returns a Firestore client."""
    global _db
    if _db is not None:
        return _db

    if not firebase_admin._apps:
        cred = None

        # Option 1: raw JSON in an environment variable (good for cloud deploys)
        raw_json = os.getenv("FIREBASE_CREDENTIALS_JSON")
        if raw_json:
            cred = credentials.Certificate(json.loads(raw_json))
        else:
            # Option 2: path to a service account key file
            key_path = os.getenv(
                "GOOGLE_APPLICATION_CREDENTIALS",
                os.path.join(os.path.dirname(__file__), "serviceAccountKey.json"),
            )
            if os.path.exists(key_path):
                cred = credentials.Certificate(key_path)

        if cred is None:
            raise RuntimeError(
                "No Firebase credentials found. Set GOOGLE_APPLICATION_CREDENTIALS, "
                "FIREBASE_CREDENTIALS_JSON, or place serviceAccountKey.json in backend/."
            )

        firebase_admin.initialize_app(cred)

    _db = firestore.client()
    return _db


def get_db():
    """Convenience accessor used by route handlers."""
    return init_firestore()
