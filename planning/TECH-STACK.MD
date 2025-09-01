# Technológiai stack

## Frontend
- **Vite + React + TypeScript**
- **UI**: Tailwind + shadcn/ui
- **State/data kezelés**: TanStack Query
- **Űrlapok**: React Hook Form + zodResolver
- **Validáció**: Zod
- **Chartok**: Recharts
- **Dátumkezelés**: dayjs
- **i18n**: i18next (HU/EN támogatás)

## Backend
- **Framework**: FastAPI (async, OpenAPI támogatás)
- **DB**: PostgreSQL
- **ORM**: SQLAlchemy + Alembic migráció
- **Auth**: JWT (access/refresh), Argon2 hashing
- **Aszinkron feldolgozás**: Celery + Redis
- **FX rates**: Napi ECB/MNB fetcher, cache a DB-ben

## Infrastrukturális elemek
- **Konténerizáció**: Docker Compose (api, db, redis, worker)  
- **CI/CD**: GitHub Actions (lint, test, build, deploy)  
- **Deploy**: Fly.io / Railway / VPS + Traefik/NGINX reverse proxy  
- **Secrets**: .env + GitHub Actions secrets

## Biztonság
- HTTPS mindenhol (TLS termináció a proxy-nál)
- JWT access token (15–30 perc) + refresh token (7–14 nap)
- Input validáció Pydantic + Zod
- Rate limiting a proxy rétegben
- Logokban PII redaction, audit trail
