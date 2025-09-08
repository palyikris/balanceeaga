from __future__ import annotations
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Enum, BigInteger, Text, Index, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
import enum
from pydantic import BaseModel

class FileStatus(str, enum.Enum):
    uploaded = "uploaded"
    queued = "queued"
    processing = "processing"
    parsed = "parsed"
    failed = "failed"


class FileAdapter(str, enum.Enum):
    csv = "csv"
    ofx = "ofx"
    qif = "qif"
    unknown = "unknown"


class FileSource(str, enum.Enum):
    otp = "otp"
    revolut = "revolut"
    ibkr = "ibkr"
    other = "other"


class File(BaseModel):
    __tablename__ = "files"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)

    original_name: Mapped[str] = mapped_column(Text, nullable=False)
    storage_bucket: Mapped[str | None] = mapped_column(Text)
    storage_path: Mapped[str] = mapped_column(Text, nullable=False, unique=True)

    mime_type: Mapped[str | None] = mapped_column(Text)
    size_bytes: Mapped[int | None] = mapped_column(BigInteger)
    checksum_sha256: Mapped[str | None] = mapped_column(String(64))

    adapter_hint: Mapped[FileAdapter] = mapped_column(
        Enum(FileAdapter, name="file_adapter"),
        default=FileAdapter.unknown,
        nullable=False,
    )
    source_hint: Mapped[FileSource] = mapped_column(
        Enum(FileSource, name="file_source"), default=FileSource.other, nullable=False
    )
    status: Mapped[FileStatus] = mapped_column(
        Enum(FileStatus, name="file_status"),
        default=FileStatus.uploaded,
        nullable=False,
    )

    error_message: Mapped[str | None] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now(), nullable=False
    )


Index("ix_files_user_id", File.user_id)
Index("ix_files_checksum_sha256", File.checksum_sha256)
Index("ix_files_status", File.status)
