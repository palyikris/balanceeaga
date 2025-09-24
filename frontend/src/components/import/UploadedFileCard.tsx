import React from "react";
import dayjs from "dayjs";
import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import type { UploadedFile } from "@/types/uploadedFile";


const formatBytes = (bytes?: number | null) => {
  if (bytes == null) return "—";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const iconByMime = (mime?: string | null) => {
  if (!mime) return <FileText className="h-6 w-6 text-electric" />;
  if (mime.startsWith("image/"))
    return <FileImage className="h-6 w-6 text-limeneon" />;
  if (mime.startsWith("video/"))
    return <FileVideo className="h-6 w-6 text-tealblue" />;
  if (mime.startsWith("audio/"))
    return <FileAudio className="h-6 w-6 text-electric" />;
  if (mime === "application/zip" || mime?.includes("compressed"))
    return <FileArchive className="h-6 w-6 text-electric" />;
  if (
    mime?.includes("json") ||
    mime?.includes("javascript") ||
    mime?.includes("typescript") ||
    mime?.includes("xml")
  )
    return <FileCode className="h-6 w-6 text-electric" />;
  if (mime?.includes("html"))
    return <Globe className="h-6 w-6 text-electric" />;
  return <FileText className="h-6 w-6 text-offwhite" />;
};

const statusChip: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  queued: {
    label: "Queued",
    color: "bg-electric/10 text-electric",
    icon: <Clock3 className="h-4 w-4" />,
  },
  processing: {
    label: "Processing",
    color: "bg-yellow-500/10 text-yellow-500",
    icon: <Clock3 className="h-4 w-4 animate-spin" />,
  },
  parsed: {
    label: "Ready",
    color: "bg-limeneon/10 text-limeneon",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  error: {
    label: "Error",
    color: "bg-red-500/10 text-red-400",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
};

export default function UploadedFileCard({
  file,
}: {
  file: UploadedFile | undefined;
}) {
  if (!file) {
    return (
      <div className="rounded-2xl border border-offwhite/10 bg-graphite/40 p-4 shadow-sm backdrop-blur-sm">
        <div className="text-offwhite/70">No file data available.</div>
      </div>
    );
  }

  const status = statusChip[file.status] ?? statusChip["queued"];

  return (
    <div className="rounded-2xl border border-limeneon/30 bg-graphite/40 p-4 shadow-sm backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coolgray/30">
          {iconByMime(file.mime_type)}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="truncate text-sm font-semibold text-offwhite"
            title={file.original_name}
          >
            {file.original_name}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-offwhite/60">
            <span>{file.mime_type ?? "unknown"}</span>
            <span>• {formatBytes(file.size_bytes)}</span>
          </div>
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-1 text-xs text-offwhite/80">
        <div>
          <span className="text-offwhite/50">Adapter:</span> {file.adapter_hint}
        </div>
        <div>
          <span className="text-offwhite/50">Source:</span> {file.source_hint}
        </div>
        <div>
          <span className="text-offwhite/50">Created:</span>{" "}
          {dayjs(file.created_at).format("YYYY-MM-DD HH:mm")}
        </div>
        <div>
          <span className="text-offwhite/50">Updated:</span>{" "}
          {dayjs(file.updated_at).format("YYYY-MM-DD HH:mm")}
        </div>
        {file.status === "error" && (
          <div className="text-red-400">
            <span className="text-offwhite/50">Error:</span>{" "}
            {file.error_message ?? "Unknown error"}
          </div>
        )}
      </div>
    </div>
  );
}
