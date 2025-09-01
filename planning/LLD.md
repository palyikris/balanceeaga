# Low-Level Design (LLD)

## Adatmodell

### users
- `id` (UUID, pk)  
- `email` (unique)  
- `password_hash` (Argon2)  
- `locale` (pl. hu-HU)  
- `base_currency` (char3, default=HUF)  
- `created_at`, `updated_at`

### files
- `id` (UUID, pk)  
- `user_id` (fk users.id)  
- `storage_path`, `original_name`, `mime`, `size`  
- `profile_hint` (enum: OTP, K&H, Revolut, Wise, IBKR, OFX, QIF, Custom)  
- `status` (enum: uploaded/processing/done/failed)  
- `error_message` (nullable)  
- `created_at`

### accounts
- `id`, `user_id` (fk), `name`, `institution`, `currency`, `type`, `is_archived`

### transactions
- `id` (UUID, pk)  
- `user_id` (fk users.id)  
- `account_id` (fk accounts.id, nullable)  
- `booking_date`, `value_date` (nullable)  
- `amount` (decimal), `currency` (char3)  
- `amount_huf` (decimal), `fx_rate` (decimal), `fx_source` (enum)  
- `description_raw`, `description_norm`, `counterparty`, `reference`  
- `category_id` (fk categories.id, nullable)  
- `is_transfer` (bool)  
- `import_file_id` (fk files.id)  
- `external_uid` (nullable)  
- unique `(user_id, external_uid)` vagy `(user_id, booking_date, amount, description_norm, counterparty)`  

### categories
- `id`, `user_id`, `parent_id`, `name`, `type (income/expense/transfer)`, `sort_order`

### rules
- `id`, `user_id`, `name`, `priority` (int), `enabled` (bool)  
- `match_type` (enum: contains/regex/equals/amount_range/…)  
- `match_value` (text/json)  
- `action_set_category_id` (nullable)  
- `action_set_tags` (text[])  
- `action_mark_transfer` (bool)  
- `created_at`, `updated_at`

### tags
- `id`, `user_id`, `name`  

### transaction_tags
- `transaction_id` (fk)  
- `tag_id` (fk)

### fx_rates
- `id`, `date`, `base` (char3), `quote` (char3), `rate` (decimal), `source` (enum)  
- unique `(date, quote)`

### invest_positions
- `id`, `user_id`  
- `symbol`, `quantity`, `avg_cost_ccy`, `currency`  
- `market_value_ccy`, `market_value_huf`  
- `updated_at`

### invest_transactions
- `id`, `user_id`, `position_id` (fk)  
- `type` (buy/sell/dividend/fee)  
- `qty`, `price`, `currency`, `fees`, `fx_rate`  
- `created_at`

---

## API v1

### Auth
- `POST /auth/register`
- `POST /auth/login` → `{access, refresh}`
- `POST /auth/refresh`
- `POST /auth/password-reset/request`
- `POST /auth/password-reset/confirm`

### Imports
- `POST /imports` (multipart CSV/OFX/QIF) → `{import_id}`
- `GET /imports/{id}` → {status, error, count}
- `GET /imports`

### Transactions
- `GET /transactions?date_from&date_to&category_id&tag&account_id`  
- `PATCH /transactions/{id}` (update category/tags/account)  
- `POST /transactions/batch`  
- `GET /exports/transactions.csv`

### Rules
- `GET /rules`  
- `POST /rules`  
- `PATCH /rules/{id}`  
- `DELETE /rules/{id}`  
- `POST /rules/{id}/preview`

### Categories
- `GET /categories`  
- `POST /categories`  
- `PATCH /categories/{id}`  
- `DELETE /categories/{id}`

### Analytics
- `GET /analytics/cashflow?period=month&from=YYYY-MM&to=YYYY-MM`  
- `GET /analytics/categories?period=month`  
- `GET /analytics/merchants/top?limit=10`

### Invest
- `POST /invest/import` (IBKR CSV)  
- `GET /invest/summary`

---

## Feldolgozási pipeline (Celery tasks)
1. `parse_import(import_id)`  
   - profil detektálás (header / user input)  
   - adapter parse → normalizált tranzakciók  
2. `deduplicate(txns)` → hash check  
3. `apply_rules(user_id, txn_ids[])` → kategória + címkék  
4. `apply_fx(user_id, date, currency)` → MNB/ECB árfolyam fetch, HUF konverzió  
5. `update_aggregates(user_id)`

---

## Biztonság
- **Jelszó**: Argon2id  
- **JWT**: rövid access (15–30 perc), refresh 7–14 nap, rotáció  
- **CORS**: csak ismert frontend domain  
- **Naplózás**: érzékeny mezők maszkolása  
- **Export**: időzített, aláírt URL
