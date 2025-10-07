from decimal import Decimal
from .base import BaseCsvAdapter


class OtpCsvAdapter(BaseCsvAdapter):
    def parse(self):
        rows = self.read_csv(delimiter=";")
        txns = []

        for row in rows:
            try:
                booking_date = self.try_parse_date(
                    row.get("Könyvelés dátuma") or row.get("Könyvelés")
                )
                amount = Decimal(row.get("Összeg", "0").replace(",", "."))
                currency = row.get("Devizanem", "HUF").strip().upper()
                description = row.get("Közlemény", "").strip() or row.get(
                    "Megjegyzés", ""
                )
                counterparty = row.get("Ellenoldal neve", "")

                txns.append(
                    {
                        "user_id": self.user_id,
                        "import_file_id": self.import_id,
                        "booking_date": booking_date,
                        "amount": amount,
                        "currency": currency,
                        "description_raw": description,
                        "counterparty": counterparty,
                    }
                )
            except Exception:
                continue
        return txns
