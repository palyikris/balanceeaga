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
from .serializers import ImportUploadSerializer, TransactionSerializer
from pathlib import Path
from django.utils.text import get_valid_filename
import time
from ingestion.models import Transaction
from .models import Rule
from .serializers import RuleSerializer
from .models import Category
from .serializers import CategorySerializer


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
        uid = (
            self.request.headers.get("X-User-Id")
            or self.request.GET.get("user_id")
            or "dev-user"
        )
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

        media_root = Path(settings.MEDIA_ROOT)
        import_dir = media_root / "imports"
        import_dir.mkdir(parents=True, exist_ok=True)

        safe_name = get_valid_filename(file.name)
        import_rel = f"imports/{safe_name}"
        full_path = media_root / import_rel

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
        time.sleep(2)
        return Response(s.data, status=status.HTTP_201_CREATED)

    @extend_schema(
        summary="Delete an import",
        description="Deletes a file import by ID.",
        responses={204: None, 404: {"detail": "Not found"}},
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except FileImport.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        file_path = Path(settings.MEDIA_ROOT) / instance.storage_path
        if file_path.exists():
            file_path.unlink()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["delete"], url_path="delete_all")
    def delete_all_imports(self, request):
        queryset = self.get_queryset()
        count = queryset.count()
        for instance in queryset:
            file_path = Path(settings.MEDIA_ROOT) / instance.storage_path
            if file_path.exists():
                file_path.unlink()
        queryset.delete()
        return Response({"deleted": count}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"], url_path="latest")
    def latest_import(self, request):
        uid = "dev-user"
        print("latest import for", uid)
        allImport = FileImport.objects.all()
        latest = allImport.filter(user_id=uid).order_by("-created_at").first()
        if not latest:
            return Response({"detail": "No imports found"}, status=404)
        serializer = self.get_serializer(latest)
        return Response(serializer.data)


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user_id = (
            self.request.headers.get("X-User-Id")
            or self.request.GET.get("user_id")
            or "dev-user"
        )
        qs = Transaction.objects.filter(user_id=user_id).order_by("-booking_date")

        date_from = self.request.query_params.get("date_from")
        date_to = self.request.query_params.get("date_to")
        category_id = self.request.query_params.get("category_id")

        if date_from:
            qs = qs.filter(booking_date__gte=date_from)
        if date_to:
            qs = qs.filter(booking_date__lte=date_to)
        if category_id:
            qs = qs.filter(category_id=category_id)

        return qs

    @extend_schema(
        summary="Delete a transaction.",
        description="Deletes a transaction by ID.",
        responses={204: None, 404: {"detail": "Not found"}},
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Transaction.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get"], url_path="get")
    def get_transaction(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Transaction.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class RuleViewSet(viewsets.ModelViewSet):
    queryset = Rule.objects.all().order_by("-id")
    serializer_class = RuleSerializer

    def get_queryset(self):
        user_id = (
            self.request.headers.get("X-User-Id")
            or self.request.GET.get("user_id")
            or "dev-user"
        )
        return Rule.objects.filter(user_id=user_id).order_by("-id")


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("-id")
    serializer_class = CategorySerializer

    def get_queryset(self):
        user_id = (
            self.request.headers.get("X-User-Id")
            or self.request.GET.get("user_id")
            or "dev-user"
        )
        return Category.objects.filter(user_id=user_id).order_by("-id")


from decimal import Decimal
from django.db.models import Sum, F, Value, Case, When, DecimalField
from django.db.models.functions import ExtractMonth, ExtractYear
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ingestion.models import Transaction


@api_view(["GET"])
def cashflow_view(request):
    """Monthly income and expense totals."""
    user_id = "dev-user"

    qs = (
        Transaction.objects.filter(user_id=user_id, is_transfer=False)
        .exclude(booking_date=None)
        .annotate(year=ExtractYear("booking_date"), month=ExtractMonth("booking_date"))
        .values("year", "month")
        .annotate(
            income=Sum(
                Case(
                    When(amount__gt=0, then=F("amount")),
                    default=Value(0),
                    output_field=DecimalField(max_digits=14, decimal_places=2),
                )
            ),
            expense=Sum(
                Case(
                    When(amount__lt=0, then=F("amount")),
                    default=Value(0),
                    output_field=DecimalField(max_digits=14, decimal_places=2),
                )
            ),
        )
        .order_by("year", "month")
    )

    data = [
        {
            "year": int(r["year"]),
            "month": int(r["month"]),
            "income": float(r["income"] or 0),
            "expense": abs(float(r["expense"] or 0)),
        }
        for r in qs
    ]
    return Response(data)


@api_view(["GET"])
def categories_view(request):
    """Breakdown of expenses by category."""
    user_id = "dev-user"

    qs = (
        Transaction.objects.filter(user_id=user_id, is_transfer=False, amount__lt=0)
        .values("category__name", "category__type")
        .annotate(
            total=Sum(
                F("amount") * Value(-1),
                output_field=DecimalField(max_digits=14, decimal_places=2),
            )
        )
        .order_by("-total")
    )

    data = [
        {
            "category": r["category__name"] or "Egyéb",
            "type": r["category__type"],
            "value": float(r["total"] or 0),
        }
        for r in qs
    ]
    return Response(data)


@api_view(["GET"])
def top_merchants_view(request):
    """Top counterparties by spending."""
    user_id = "dev-user"
    limit = int(request.query_params.get("limit", 10))

    qs = (
        Transaction.objects.filter(user_id=user_id, is_transfer=False, amount__lt=0)
        .values("counterparty")
        .annotate(
            total=Sum(
                F("amount") * Value(-1),
                output_field=DecimalField(max_digits=14, decimal_places=2),
            )
        )
        .order_by("-total")[:limit]
    )

    data = [
        {
            "name": r["counterparty"] or "(no counterparty)",
            "amount": float(r["total"] or 0),
        }
        for r in qs
    ]
    return Response(data)
