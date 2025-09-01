# BalanceeAga

Egy személyes pénzügyi dashboard, amely több forrásból származó tranzakciókat (bankok, fintech appok, brókerszámlák) egységesít, kategorizál és vizualizál.  
A rendszer célja: **átlátható cashflow**, **kiadások és bevételek követése**, **megtakarítási célok**, valamint **befektetések monitorozása** HUF/FX támogatással.

## Fő funkciók
- Tranzakciók importálása CSV/OFX/QIF fájlokból (OTP, K&H, Revolut, Wise, IBKR)
- Automatikus szabály-alapú kategorizálás
- Manuális kategóriázás és batch szerkesztés
- Havi/éves cashflow és költési dashboard
- Több pénznem támogatása (MNB/ECB árfolyam)
- Befektetések alap szintű nyilvántartása (IBKR Flex import)
- Export CSV-be
- Biztonságos user management (regisztráció, login, JWT auth)

## Roadmap
- **MVP (4–6 hét)**: Auth, fájlimport, kategorizálás, cashflow dashboard, FX konverzió, egyszerű befektetési összesítő.  
- **v1.0 (2–3 hónap)**: Budgeting, megtakarítási célok, recurring detection, részletes befektetési idősorok, PWA támogatás, audit trail.

