from backend.src.models.risk_classifier import RiskClassifier

def run_training_pipeline():
    print("Starting model training pipeline...")
    classifier = RiskClassifier()
    classifier.train_and_save()
    print("Training pipeline finished successfully.")

if __name__ == "__main__":
    run_training_pipeline()