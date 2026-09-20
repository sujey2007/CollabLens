from pydantic import BaseModel

class CollectRepoRequest(BaseModel):
    owner: str
    repo: str

class PredictRiskRequest(BaseModel):
    commit_count: int
    pr_count: int
    issue_count: int

class PredictRiskResponse(BaseModel):
    is_high_risk: int
    risk_probability: float