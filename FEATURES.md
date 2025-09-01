# Feature specifikáció

## MVP (4–6 hét)
### Auth
- E-mail + jelszó alapú regisztráció és login
- JWT token kezelés (access/refresh)
- Jelszó visszaállítás e-mailben

### Adatimport
- CSV / OFX / QIF fájl feltöltés
- Előre definiált importprofilok (OTP, K&H, Revolut, Wise, IBKR)
- Aszinkron parse/normalize (Celery + Redis)
- Duplikátum felismerés

### Tranzakciók
- Alap mezők: dátum, összeg, deviza, leírás, ellenoldal, kategória, címkék
- Automatikus kategorizálás szabályok alapján (string match / regex / amount / ellenfél)
- Manuális kategória és címke szerkesztés
- Batch edit támogatás

### Kategóriák és szabályok
- Hierarchikus kategóriák (pl. Kiadás → Étkezés → Étterem)
- Szabálymotor: priorizált feltételek, előnézet, engedélyezés/tiltás

### Dashboard
- Havi / éves cashflow grafikonok
- Kiadás/bevétel kategória bontás
- Top kereskedők

### Pénznemek
- Alapértelmezett: HUF
- Több deviza támogatása
- Automatikus árfolyam konverzió (MNB/ECB API, cache)

### Befektetések (alap)
- IBKR Flex CSV import
- Pozíciók, realizált P/L, osztalékok összegzése HUF-ban

### Adatvédelem
- Userenkénti izolált adatbázis sorok
- Saját adatok exportja CSV/JSON formátumban
- Logokban PII redaction

---

## v1.0 (2–3 hónap)
- **Budgeting**: havi keretek kategóriánként, túlköltés jelzése
- **Goals**: megtakarítási célok (összeg, határidő, progress bar)
- **Recurring detection**: ismétlődő tételek automatikus felismerése
- **Advanced invest**: TWR, benchmark (pl. MSCI World ETF) riport
- **Mobile-friendly PWA**: offline read-only cache
- **Audit trail**: minden tranzakciós/kategória változás naplózása
