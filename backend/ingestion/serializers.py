from rest_framework import serializers
from .models import FileImport


class FileImportSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileImport
        fields = "__all__"
        read_only_fields = (
            "id",
            "status",
            "error_message",
            "checksum_sha256",
            "size_bytes",
            "storage_path",
            "created_at",
            "updated_at",
        )


class ImportUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
