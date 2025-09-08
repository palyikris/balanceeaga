from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from app.api.routes import auth

app = FastAPI()

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

app.include_router(auth.router)
