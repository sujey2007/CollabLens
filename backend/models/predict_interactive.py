import joblib
import pandas as pd
import os

def predict_custom_input():
    model_path = os.path.join("backend", "models", "risk_model.pkl")
    if not os.path.exists(model_path):
        print("Model not found! Please train the model first.")
        return

    model = joblib.load(model_path)
    
    # Get exact feature names expected by the model
    if hasattr(model, "feature_names_in_"):
        expected_features = list(model.feature_names_in_)
    else:
        expected_features = ["commit_count", "pr_count", "issue_count", "imbalance_score"]

    print("--- CollabLens Interactive Risk Predictor ---")
    print(f"Model expects these features: {expected_features}\n")
    
    input_values = []
    try:
        for feature in expected_features:
            val = float(input(f"Enter value for '{feature}': "))
            input_values.append(val)

        # Build input dataframe matching model expected features
        input_data = pd.DataFrame([input_values], columns=expected_features)

        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0] if hasattr(model, "predict_proba") else None

        print("\n--- Prediction Results ---")
        print(f"Predicted Risk Class (0 = Low Risk, 1 = High Risk): {prediction}")
        if probability is not None:
            print(f"Confidence / Probabilities [Low, High]: {probability}")

    except ValueError:
        print("\nInvalid input! Please enter valid numerical values.")

if __name__ == "__main__":
    predict_custom_input()