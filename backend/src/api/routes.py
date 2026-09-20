from fastapi import APIRouter, HTTPException
from backend.src.api.schemas import CollectRepoRequest, PredictRiskRequest, PredictRiskResponse
from backend.src.data_collection.github_client import GitHubClient
from backend.src.preprocessing.feature_engineering import FeatureEngineer
from backend.src.models.clustering import TeamBehaviorClustering
from backend.src.models.risk_classifier import RiskClassifier

router = APIRouter()

@router.post("/collect")
def collect_repository_data(payload: CollectRepoRequest):
    try:
        client = GitHubClient(payload.owner, payload.repo)
        client.collect_and_save_all()
        
        engineer = FeatureEngineer(f"{payload.owner}_{payload.repo}")
        engineer.extract_features()
        
        return {"status": "success", "message": f"Successfully collected and processed {payload.owner}/{payload.repo}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict", response_model=PredictRiskResponse)
def predict_team_risk(payload: PredictRiskRequest):
    try:
        classifier = RiskClassifier()
        result = classifier.predict_risk(
            commit_count=payload.commit_count,
            pr_count=payload.pr_count,
            issue_count=payload.issue_count
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analytics/clusters")
def get_behavior_clusters():
    try:
        clustering = TeamBehaviorClustering()
        df = clustering.cluster_contributors()
        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))