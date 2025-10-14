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
import { useDeleteUpload } from "@/hooks/import/useDeleteUpload";
import { Spinner } from "../ui/shadcn-io/spinner";
import { useQueryClient } from "@tanstack/react-query";

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
  uploaded: {
    label: "Uploaded",
    color: "bg-electric/10 text-electric",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
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
  failed: {
    label: "Failed",
    color: "bg-red-500/10 text-red-400",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
};

export default function UploadedFileCard({
  file,
  showDelete = true,
}: {
  file: UploadedFile | undefined;
  showDelete?: boolean;
}) {
  const { isPending, mutateAsync } = useDeleteUpload(file?.id ?? "");

  const status = statusChip[file && file.status ? file.status : "queued"];

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!file) return;
    if (isPending) return;
    await mutateAsync();
    await queryClient.invalidateQueries({ queryKey: ["all-uploads"] });
    await queryClient.invalidateQueries({ queryKey: ["latest-upload"] });
  };

  if (!file) {
    return (
      <div className="rounded-2xl border border-offwhite/10 bg-graphite/40 p-4 shadow-sm backdrop-blur-sm">
        <div className="text-offwhite/70">No file data available.</div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="rounded-2xl border border-limeneon/30 bg-graphite/40 p-4 shadow-sm backdrop-blur-sm">
        <Spinner color="#00B3B3"></Spinner>
        <div className="text-offwhite/70">Loading...</div>
      </div>
    );
  }

  console.log(status, file.status);

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
      <div className="mt-4 space-y-1 text-xs text-offwhite/80 flex flex-row justify-center items-center">
        <div className="w-full flex flex-col justify-center items-start space-y-1 pl-6 border-l border-offwhite/10">
          <div>
            <span className="text-offwhite/50">Adapter:</span>{" "}
            {file.adapter_hint}
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
        {showDelete && (
          <div className="flex-1 flex justify-end">
            <button
              className="hover:bg-electric/10 p-4 rounded-lg transition-colors cursor-pointer"
              onClick={handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FF3CAC"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
