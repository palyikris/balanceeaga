# High-Level Design (HLD)

## Architektúra
[React/Vite Frontend] <--HTTP--> [FastAPI Backend] <--SQLAlchemy--> [PostgreSQL]
│
└─[Celery + Redis]───> [Parsers, FX fetcher]
│
└─[S3 / helyi storage]

## Komponensek
- **Frontend**  
  - React + Tailwind + shadcn/ui komponensek  
  - TanStack Query adatkéréshez  
  - PWA támogatás (offline cache)

- **Backend (FastAPI)**  
  - **Auth modul**: user kezelés, JWT, jelszó reset  
  - **Ingestion modul**: fájlfeltöltés, adapterek, duplikátum kezelés  
  - **Rules modul**: kategorizálási szabályok, priorizálás, preview  
  - **Ledger modul**: normalizált tranzakciók, könyvelés, FX konverzió  
  - **Analytics modul**: cashflow, kategória és kereskedő riportok  
  - **Invest modul**: IBKR import, pozíciók és P/L számítás

## Aszinkron feldolgozás
- **Celery workers** futtatják a nehéz feladatokat:  
  - Tranzakció import & parse  
  - Szabály alkalmazás  
  - Árfolyam frissítés (időzített cron)  

## Adatvédelem és biztonság
- HTTPS minden kommunikáción  
- JWT auth (access/refresh token)  
- Szigorú CORS policy  
- PII adatmaszkolás a logokban  
- Userenkénti adatizoláció az adatbázisban  
- Időzített, aláírt export linkek
