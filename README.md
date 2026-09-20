# CollabLens

Ah, I see what happened! The markdown parser got tripped up on some raw emojis and unescaped characters right around the Mermaid diagram block in the README.md.

Here is the clean, fully fixed README.md file code with the Mermaid syntax safely formatted so GitHub can render it without any errors:

Markdown
# CollabLens
### Collaborative Engineering Intelligence & Real-Time Sprint Risk Dashboard

[![React Native](https://img.shields.io/badge/Frontend-React%20Native%20%7C%20Expo-00E5FF?style=for-the-badge&logo=react&logoColor=white)](https://expo.dev)
[![FastAPI](https://img.shields.io/badge/Backend-Python%20FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Machine Learning](https://img.shields.io/badge/ML-Risk%20Classification-FF6F00?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## Authors
* **H Sujey** *(Frontend Architecture, UI/UX Design & State Management)*
* **Hanan Lawson L.R.** *(Backend API, Data Structures & Machine Learning Risk Pipeline)*

---

## Overview
**CollabLens** is an advanced engineering intelligence platform designed to eliminate hidden development bottlenecks. Traditional project management tools rely on lagging indicators after sprints fail. CollabLens bridges this gap by ingesting real-time team contribution metrics and utilizing a **Machine Learning classification pipeline** to forecast sprint risk levels and compute global health scores dynamically.

---

## System Architecture & Workflow

The end-to-end telemetry pipeline from raw code commits to visual risk classification is structured as follows:

```mermaid
graph TD
    A[Commit Logs & Telemetry] -->|Asynchronous Ingestion| B[FastAPI Backend]
    B --> C[Preprocessing Engine]
    C -->|Rolling 7-Day Window| D[ML Risk Classification Model]
    D --> E[Global Health Score Engine]
    E -->|JSON Payload| F[React Native / Expo Client]
    F --> G[Cyber-Grid Dashboard UI]
Tech Stack
Frontend (Mobile / Cross-Platform)
Framework: React Native with Expo & Expo Router

Styling: Custom dark-mode theme (#0B0F19 deep space background, #00E5FF cyan neon accents)

Iconography: @expo/vector-icons (Ionicons & MaterialCommunityIcons)

Backend & Machine Learning
API Framework: Python FastAPI for rapid, asynchronous telemetry processing

Database Layer: MongoDB & MySQL for repository metadata storage

ML Heuristics: Supervised classification models and rolling-window statistical thresholding for predictive risk scoring

Key Features
Quick Feature Hub: One-tap navigation to search filters, health score metrics, and velocity graph analytics.

Dynamic Team Registration: Register custom engineering squads and track live commit targets against weekly benchmarks (e.g., 20-commit goals).

Real-Time Sprint Counter: Interactive adjusters (-1, +1, +5 Daily) that recalculate daily averages and peak output days instantly.

Automated Risk Tiers: Automated color-coded badges (Low Risk vs. High Risk) driven by underlying productivity heuristics.

Getting Started Locally
Prerequisites
Node.js & npm / yarn installed

Python 3.x installed

Expo CLI (npm install -g expo-cli)

1. Clone the Repository
Bash
git clone [https://github.com/sujey2007/CollabLens.git](https://github.com/sujey2007/CollabLens.git)
cd CollabLens
2. Run the Frontend (React Native / Expo)
Bash
npm install
npx expo start
3. Run the Backend (FastAPI)
Bash
cd backend
python -m venv venv
venv\Scripts\activate  # On macOS/Linux use: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
