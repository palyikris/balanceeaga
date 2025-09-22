from celery import shared_task
from django.db import transaction
from .models import FileImport, FileStatus
import time


@shared_task
def parse_import_task(import_id: str):
    try:
        with transaction.atomic():
            fi = FileImport.objects.select_for_update().get(id=import_id)
            fi.status = FileStatus.PROCESSING
            fi.save(update_fields=["status"])
            time.sleep(5)
            # TODO: adapter detektálás + CSV/OFX/QIF parse → transactions mentés
            # Itt egyelőre csak „PARSED”-re állítjuk, mintha sikerült volna.
            fi.status = FileStatus.PARSED
            fi.save(update_fields=["status"])
    except Exception as e:
        FileImport.objects.filter(id=import_id).update(
            status=FileStatus.FAILED, error_message=str(e)
        )
