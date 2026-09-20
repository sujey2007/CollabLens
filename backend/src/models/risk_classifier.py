import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
from backend.src.config import PROCESSED_DATA_DIR, MODEL_PATH

class RiskClassifier:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)

    def train_and_save(self):
        csv_path = PROCESSED_DATA_DIR / "features.csv"
        if not csv_path.exists():
            raise FileNotFoundError("Processed features.csv not found. Run feature engineering first.")

        df = pd.read_csv(csv_path)
        if df.empty or "is_high_risk" not in df.columns:
            raise ValueError("Insufficient data or missing 'is_high_risk' target label in dataset.")

        X = df[["commit_count", "pr_count", "issue_count"]]
        y = df["is_high_risk"]

        # If only one class exists in y, append synthetic balance to allow training
        if len(y.unique()) < 2:
            print("Warning: Only one class present in target. Adding dummy sample for model stability.")
            # Create a dummy high-risk or low-risk row to allow training split
            X = pd.concat([X, pd.DataFrame([[0, 0, 0]], columns=X.columns)], ignore_index=True)
            y = pd.concat([y, pd.Series([1])], ignore_index=True)

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.model.fit(X_train, y_train)
        
        # Save trained model binary
        joblib.dump(self.model, MODEL_PATH)
        print(f"Risk classifier model successfully trained and saved to {MODEL_PATH}")
        return self.model

    def predict_risk(self, commit_count: int, pr_count: int, issue_count: int):
        if not MODEL_PATH.exists():
            self.train_and_save()
        
        model = joblib.load(MODEL_PATH)
        prediction = model.predict([[commit_count, pr_count, issue_count]])
        probability = model.predict_proba([[commit_count, pr_count, issue_count]])[0][1]
        
        return {
            "is_high_risk": int(prediction[0]),
            "risk_probability": float(probability)
        }