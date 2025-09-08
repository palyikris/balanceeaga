from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from app.api.routes import auth

app = FastAPI()


from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # ha a Vite más portra váltana:
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # pontos origin egyezés kell
    allow_credentials=True,  # maradhat True; ha nem küldesz sütit, akkor is oké
    allow_methods=["*"],  # engedjük a POST/OPTIONS-t is
    allow_headers=["*"],  # pl. Content-Type
)


@app.get("/healthz")
def healthz():
    return {"status": "ok"}

app.include_router(auth.router)
