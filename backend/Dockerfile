# ---------- Base ----------
FROM python:3.12-slim AS base
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Rendszerfüggőségek (psycopg2-hez, stb.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# Függőségek
COPY requirements.txt .
RUN pip install -r requirements.txt

# App forrás
COPY . .

# ---------- Dev (uvicorn --reload) ----------
FROM base AS dev
ENV ENV=dev
EXPOSE 8000
# Állítsd a modul:app útvonalat a sajátodra (pl. app.main:app)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ---------- Prod (uvicorn workers) ----------
FROM base AS prod
ENV ENV=prod
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

# ---------- Celery worker ----------
FROM base AS worker
ENV ENV=worker
# CELERY_APP-nál állítsd be a modul útvonalat (pl. app.worker.celery_app)
# Példa: a celery instance neve: celery_app az app/worker.py-ben
CMD ["celery", "-A", "app.worker:celery_app", "worker", "-l", "INFO"]

# ---------- Celery beat (ha kell ütemezés) ----------
FROM base AS beat
ENV ENV=beat
CMD ["celery", "-A", "app.worker:celery_app", "beat", "-l", "INFO"]
