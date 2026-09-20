import joblib
import pandas as pd
import os

model_path = os.path.join("backend", "models", "risk_model.pkl")
data_path = os.path.join("backend", "data", "processed", "features.csv")

model = joblib.load(model_path)
df = pd.read_csv(data_path)

# If the model recorded feature names during training, use them:
if hasattr(model, "feature_names_in_"):
    expected_features = model.feature_names_in_
    X = df[expected_features]
else:
    # Fallback default dropping non-feature columns
    X = df.drop(columns=["contributor", "is_high_risk"])

predictions = model.predict(X)
df["predicted_risk"] = predictions

print("--- Model Prediction Test Successful ---")
print(df[["contributor", "is_high_risk", "predicted_risk"]])