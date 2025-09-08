from __future__ import annotations
from pydantic import BaseModel, UUID4, Field
from datetime import datetime
from app.api.models.file import FileStatus, FileAdapter, FileSource


class FileOut(BaseModel):
    id: UUID4
    user_id: UUID4
    original_name: str
    storage_bucket: str | None
    storage_path: str
    mime_type: str | None
    size_bytes: int | None
    checksum_sha256: str | None
    adapter_hint: FileAdapter
    source_hint: FileSource
    status: FileStatus
    error_message: str | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
