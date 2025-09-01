# app/worker.py
import os
from celery import Celery

BROKER_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
BACKEND_URL = BROKER_URL

celery_app = Celery(
    "finance_app",
    broker=BROKER_URL,
    backend=BACKEND_URL,
)


@celery_app.task
def example_task(x: int, y: int) -> int:
    return x + y
