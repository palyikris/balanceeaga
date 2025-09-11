from django.shortcuts import render
import hashlib, os
from django.conf import settings
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import FileImport, FileStatus
from .serializers import FileImportSerializer
from .tasks import parse_import_task
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .serializers import ImportUploadSerializer


def sha256sum(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


class ImportViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = FileImport.objects.all().order_by("-created_at")
    serializer_class = FileImportSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        # később Supabase JWT-ből user azonosítás; dev: header vagy query
        uid = self.request.headers.get("X-User-Id") or self.request.GET.get("user_id")
        qs = super().get_queryset()
        return qs.filter(user_id=uid) if uid else qs.none()

    @extend_schema(
        request=ImportUploadSerializer,  # multipart/form-data file mezővel
        responses=FileImportSerializer,
        parameters=[
            OpenApiParameter(
                name="X-User-Id",
                required=False,
                location=OpenApiParameter.HEADER,
                description="Supabase user id (dev módban opcionális)",
            ),
        ],
        summary="Fájl import indítása",
        description="CSV/OFX/QIF fájl feltöltése és feldolgozásra küldése.",
        tags=["imports"],
    )
    def create(self, request, *args, **kwargs):
        file = request.FILES.get("file")
        user_id = (
            request.headers.get("X-User-Id")
            or request.data.get("user_id")
            or "dev-user"
        )
        if not file:
            return Response({"detail": "No file"}, status=400)

        os.makedirs(settings.MEDIA_ROOT / "imports", exist_ok=True)
        import_rel = f"imports/{file.name}"
        full_path = settings.MEDIA_ROOT / import_rel

        # név ütközés elkerülés
        base, ext = os.path.splitext(import_rel)
        i = 1
        while full_path.exists():
            import_rel = f"{base}_{i}{ext}"
            full_path = settings.MEDIA_ROOT / import_rel
            i += 1

        with open(full_path, "wb+") as dest:
            for chunk in file.chunks():
                dest.write(chunk)

        checksum = sha256sum(str(full_path))
        rec = FileImport.objects.create(
            user_id=user_id,
            original_name=file.name,
            storage_path=import_rel,
            mime_type=file.content_type,
            size_bytes=file.size,
            checksum_sha256=checksum,
            status=FileStatus.UPLOADED,
        )
        # queue feldolgozásra
        parse_import_task.delay(str(rec.id))
        s = self.get_serializer(rec)
        return Response(s.data, status=status.HTTP_201_CREATED)
