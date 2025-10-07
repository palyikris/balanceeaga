import csv
import io
import re


class UnknownProfileError(Exception):
    pass


def detect_profile(raw_bytes: bytes) -> str:
    """
    Egyszerű automatikus profil-detektálás.
    Csak OTP és Revolut CSV fájlokat ismer fel.
    Ha egyikre sem illik, UnknownProfileError-t dob.
    """
    text = raw_bytes.decode("utf-8-sig", errors="ignore")
    first_2kb = text[:2048].lower()

    # OFX/QIF formátum kizárása (csak CSV)
    if first_2kb.startswith("<ofx>") or first_2kb.startswith("!type:"):
        raise UnknownProfileError("Nem CSV formátumú fájl.")

    # próbáljuk beolvasni a fejlécet
    sample = io.StringIO(text)
    # vessző és pontosvessző is lehet elválasztó
    for delimiter in (";", ","):
        sample.seek(0)
        reader = csv.reader(sample, delimiter=delimiter)
        try:
            headers = next(reader)
        except StopIteration:
            continue

        header_line = " ".join(h.lower().strip() for h in headers)

        # --- Revolut CSV ---
        if all(
            k in header_line
            for k in ["completed date", "description", "amount", "currency"]
        ):
            return "Revolut"

        # --- OTP CSV ---
        # magyar ékezetes fejlécmezők + dátum + vesszős tizedes
        if any("könyvelés" in h for h in headers) or "közlemény" in header_line:
            return "OTP"

    # fallback: minták alapján próbálunk következtetni
    if re.search(r"\bcompleted date\b", first_2kb):
        return "Revolut"
    if "könyvelés dátuma" in first_2kb or "értéknap" in first_2kb:
        return "OTP"

    raise UnknownProfileError(
        "Ismeretlen vagy nem támogatott profil (csak OTP és Revolut CSV támogatott)."
    )
