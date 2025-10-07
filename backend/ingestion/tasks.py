from celery import shared_task
from django.db import transaction
from .models import FileImport, FileStatus, FileAdapter, FileSource
import time
from ingestion.imports.detect import detect_profile, UnknownProfileError
from ingestion.imports.factory import get_adapter


@shared_task
def parse_import_task(import_id: str):
    try:
        with transaction.atomic():
            fi = FileImport.objects.select_for_update().get(id=import_id)
            fi.status = FileStatus.PROCESSING
            fi.save(update_fields=["status"])
            # fájl beolvasása a storage-ból
            with open(fi.storage_path, "rb") as f:
                raw_bytes = f.read()

            try:
                profile = detect_profile(raw_bytes)
            except UnknownProfileError as e:
                fi.status = FileStatus.FAILED
                fi.error_message = str(e)
                fi.save(update_fields=["status", "error_message"])
                return

            fi.adapter_hint = FileAdapter.CSV
            fi.source_hint = FileSource.OTP if profile == "OTP" else FileSource.REVOLUT
            fi.save(update_fields=["adapter_hint", "source_hint"])

            # Itt majd jön a konkrét parser hívása:
            #   transactions = parse_otp_csv(raw_bytes) vagy parse_revolut_csv(raw_bytes)
            # de most csak szimulálunk:
            print(f"Detected profile: {profile}")

            adapter_class = get_adapter(fi.adapter_hint, fi.source_hint)
            adapter = adapter_class(raw_bytes, fi.user_id, fi.id)
            transactions = adapter.parse()

            print(f"Parsed {len(transactions)} transactions.")

            fi.status = FileStatus.PARSED
            fi.save(update_fields=["status"])
    except Exception as e:
        FileImport.objects.filter(id=import_id).update(
            status=FileStatus.FAILED, error_message=str(e)
        )
