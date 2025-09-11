from django.db import models
import uuid


class FileStatus(models.TextChoices):
    UPLOADED = "uploaded"
    QUEUED = "queued"
    PROCESSING = "processing"
    PARSED = "parsed"
    FAILED = "failed"


class FileAdapter(models.TextChoices):
    CSV = "csv"
    OFX = "ofx"
    QIF = "qif"
    UNKNOWN = "unknown"


class FileSource(models.TextChoices):
    OTP = "otp"
    REVOLUT = "revolut"
    IBKR = "ibkr"
    OTHER = "other"


class FileImport(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.CharField(max_length=64)  # Supabase user UUID string
    original_name = models.TextField()
    storage_path = models.TextField(unique=True)  # MEDIA_ROOT-on belüli relatív út
    mime_type = models.TextField(null=True, blank=True)
    size_bytes = models.BigIntegerField(null=True, blank=True)
    checksum_sha256 = models.CharField(max_length=64, null=True, blank=True)

    adapter_hint = models.CharField(
        max_length=16, choices=FileAdapter.choices, default=FileAdapter.UNKNOWN
    )
    source_hint = models.CharField(
        max_length=16, choices=FileSource.choices, default=FileSource.OTHER
    )
    status = models.CharField(
        max_length=16, choices=FileStatus.choices, default=FileStatus.UPLOADED
    )
    error_message = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
