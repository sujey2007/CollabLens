from fastapi import FastAPI

app = FastAPI()


@app.post("/api/collect")
async def collect_data(data: dict):
  owner = data.get("owner", "unknown")
  repo = data.get("repo", "unknown")

  # Make sure this return is NOT commented out
  return {
      "status": "success",
      "repository": f"{owner}/{repo}",
      "message": "Data collected successfully",
  }