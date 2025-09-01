# ✅ STEPS.md – BalanceeAga fejlesztési lépések

Ez a dokumentum részletes, lépésről lépésre lebontott feladatlistát tartalmaz minden **milestone**-hoz.  
Minden rész *checklist* formátumban van, hogy könnyen követni tudd a haladást.

---

## Milestone 1 – Alapok és infrastruktúra  
**Határidő:** 2025-09-15  
**Cél:** A projekt alapjainak lefektetése, környezet, konténerizáció, CI/CD és dokumentáció.

- [x] **Repo létrehozása**
  - [x] Új GitHub repository létrehozása: `balanceeaga`
  - [x] `.gitignore` feltöltése (Node.js, Python, Docker, IDE fájlok kizárva)
  - [x] Alap README.md feltöltése

- [ ] **Projekt skeleton**
  - [x] `frontend/` mappa létrehozása és Vite + React + TS init  
    - `npm create vite@latest frontend -- --template react-ts`
    - `npm install` + Tailwind + shadcn/ui + TanStack Query + React Hook Form + Zod
  - [ ] `backend/` mappa létrehozása és FastAPI init  
    - `pip install fastapi uvicorn[standard] sqlalchemy alembic psycopg2-binary python-jose[cryptography] passlib[bcrypt] redis celery`

- [ ] **Docker Compose**
  - [ ] Dockerfile a backendhez  
  - [ ] Dockerfile a frontendhez  
  - [ ] `docker-compose.yml`: szolgáltatások: `frontend`, `backend`, `db (PostgreSQL)`, `redis`, `worker`
  - [ ] Healthcheckek hozzáadása  

- [ ] **CI/CD pipeline**
  - [ ] GitHub Actions workflow létrehozása: `lint + test + build`
  - [ ] Backend: pytest futtatása  
  - [ ] Frontend: `npm run lint` és `npm run build`
  - [ ] Deploy előkészítés (Fly.io / Railway config)

- [ ] **Env és secrets kezelés**
  - [ ] `.env.example` létrehozása (DB_URL, JWT_SECRET, REDIS_URL stb.)  
  - [ ] GitHub Actions secrets beállítása  
  - [ ] `.env` betöltése FastAPI és frontend oldalon  

---

## Milestone 2 – Autentikáció és user management  
**Határidő:** 2025-09-30  
**Cél:** Biztonságos user kezelés, belépés és jelszó reset megvalósítása.

- [ ] **Backend**
  - [ ] `users` táblázat + SQLAlchemy modell + Alembic migráció
  - [ ] JWT auth implementáció (access + refresh token)
  - [ ] `POST /auth/register` endpoint
  - [ ] `POST /auth/login` endpoint
  - [ ] `POST /auth/refresh` endpoint
  - [ ] `POST /auth/password-reset/request` (email küldése – dummy provider első körben)
  - [ ] `POST /auth/password-reset/confirm`

- [ ] **Frontend**
  - [ ] Login és Register oldalak létrehozása (React + Tailwind + shadcn/ui)  
  - [ ] React Hook Form + Zod integrálása validációhoz  
  - [ ] JWT token kezelése TanStack Query + Redux Toolkit auth slice segítségével  
  - [ ] Logout funkció implementálása  
  - [ ] Alap navigációs menü (bejelentkezve / kijelentkezve)  

---

## Milestone 3 – Adatimport pipeline  
**Határidő:** 2025-10-20  
**Cél:** Tranzakciók importálása különböző formátumokból, feldolgozás és státuszkezelés.

- [ ] **Backend**
  - [ ] `files` táblázat + modell + migráció  
  - [ ] `POST /imports` endpoint (multipart file upload)  
  - [ ] Adapter interfész definiálása (CSV, OFX, QIF)  
  - [ ] OTP + Revolut + IBKR parser implementálása  
  - [ ] Celery task: `parse_import` – fájl feldolgozása és `transactions` táblába írás  
  - [ ] Deduplication logika (`hash` mező számítása)  
  - [ ] `GET /imports/{id}` – státusz és hibaüzenetek  
  - [ ] `GET /imports` – user saját importjai listázva  

- [ ] **Frontend**
  - [ ] „Import” oldal UI (drag & drop + fájl kiválasztás)  
  - [ ] Fájl feltöltés integráció  
  - [ ] Import státusz folyamatos lekérdezése (TanStack Query polling)  
  - [ ] Hibák / sikeres import visszajelzés  

---

## Milestone 4 – Tranzakciók, kategóriák és szabályok  
**Határidő:** 2025-11-05  
**Cél:** Tranzakciók kezelése, kategorizálás, szabálymotor.

- [ ] **Backend**
  - [ ] `transactions`, `categories`, `rules`, `tags`, `transaction_tags` táblák + migrációk  
  - [ ] `GET /transactions` + filterelés (dátum, kategória, tag, account)  
  - [ ] `PATCH /transactions/{id}` (kategória, tag, account módosítása)  
  - [ ] `POST /transactions/batch` (tömeges módosítás)  
  - [ ] Szabálymotor implementálása (match type: contains, regex, amount)  
  - [ ] `GET/POST/PATCH/DELETE /rules` endpointok  
  - [ ] `POST /rules/{id}/preview` – előnézet  

- [ ] **Frontend**
  - [ ] Tranzakció lista komponens (táblázat Recharts nélkül)  
  - [ ] Kereső- és szűrőmezők (React Hook Form + TanStack Query integráció)  
  - [ ] Kategória kezelés UI (CRUD)  
  - [ ] Szabálykezelő UI (CRUD + preview funkció)  
  - [ ] Batch szerkesztési lehetőség a táblázatban  

---

## Milestone 5 – Dashboard és analitika  
**Határidő:** 2025-11-20  
**Cél:** Áttekinthető pénzügyi dashboard riportokkal és grafikonokkal.

- [ ] **Backend**
  - [ ] `GET /analytics/cashflow?period=month`  
  - [ ] `GET /analytics/categories?period=month`  
  - [ ] `GET /analytics/merchants/top`  
  - [ ] `update_aggregates` Celery task implementációja és cron job beállítása  

- [ ] **Frontend**
  - [ ] Dashboard oldal létrehozása  
  - [ ] Cashflow grafikon (Recharts + dayjs formázás)  
  - [ ] Kiadás/bevétel kategória bontás vizualizációja  
  - [ ] Top kereskedők lista megjelenítése  
  - [ ] PWA support bekapcsolása (offline cache alap)  

---

## Milestone 6 – Pénznemek és befektetések  
**Határidő:** 2025-12-05  
**Cél:** Devizák kezelése és alap befektetési funkciók.

- [ ] **Backend**
  - [ ] `fx_rates` tábla + modell + migráció  
  - [ ] FX fetcher (ECB/MNB API integráció) + Celery task időzített futtatással  
  - [ ] `apply_fx(user_id, date, currency)` implementálása  
  - [ ] `invest_positions`, `invest_transactions` táblák + migrációk  
  - [ ] `POST /invest/import` (IBKR Flex CSV feldolgozása)  
  - [ ] `GET /invest/summary` – pozíciók, P/L, osztalékok összesítése  

- [ ] **Frontend**
  - [ ] Pénznem váltási opció beállítása (alapdeviza HUF)  
  - [ ] Befektetés összkép oldal (pozíciók, grafikonok)  
  - [ ] IBKR import UI (fájl feltöltés, státusz követés)  

---

## Milestone 7 – v1.0 kiegészítők  
**Határidő:** 2026-01-15  
**Cél:** Haladó funkciók, PWA, audit trail, célkezelés.

- [ ] **Backend**
  - [ ] Budgeting modul (havi keretek kategóriánként)  
  - [ ] Goals modul (megtakarítási célok kezelése, progress)  
  - [ ] Recurring transaction detection  
  - [ ] Audit trail táblázat + middleware integráció  

- [ ] **Frontend**
  - [ ] Budgeting UI (keretek beállítása, figyelmeztetés túlköltéskor)  
  - [ ] Goals dashboard (progress bar, státusz)  
  - [ ] Recurring tételek kezelő nézet  
  - [ ] Teljes PWA támogatás (offline read-only mód, installálható app)  

- [ ] **Tesztelés és finomhangolás**
  - [ ] E2E tesztek bevezetése (pl. Playwright / Cypress)  
  - [ ] Unit + integration tesztek bővítése  
  - [ ] Deployment stabilizálása, dokumentáció véglegesítése  
  - [ ] Beta verzió publikálása (v1.0)  

---
