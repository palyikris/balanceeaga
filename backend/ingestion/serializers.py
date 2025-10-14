from rest_framework import serializers
from .models import FileImport
from ingestion.models import Category, Transaction

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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "type"]


class TransactionSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = [
            "id",
            "booking_date",
            "amount",
            "currency",
            "description_raw",
            "counterparty",
            "category",
        ]
