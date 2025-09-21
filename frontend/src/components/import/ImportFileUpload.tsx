"use client"

import { AlertCircleIcon, PaperclipIcon, UploadIcon, XIcon } from "lucide-react"

import {
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react";
import { useUploadImport } from "@/hooks/useUploadImport";
import { useImportStatus } from "@/hooks/useImportStatus";

export default function ImportFileUpload() {
  const maxSize = 10 * 1024 * 1024; // 10MB

  const [
    { files, isDragging, errors },
    {
      getInputProps,
      openFileDialog,
      removeFile,
      handleDrop,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
    },
  ] = useFileUpload({ maxSize, multiple: false });

  const fileWithPreview = files[0];
  const realFile =
    fileWithPreview?.file instanceof File ? fileWithPreview.file : undefined;

  const [pct, setPct] = useState(0);
  const [importId, setImportId] = useState<string | undefined>();
  const abortRef = useRef<AbortController | null>(null);

  const uploadMutation = useUploadImport();
  const { data: status } = useImportStatus(importId);

  const canUpload = Boolean(realFile) && !uploadMutation.isPending;

  const startUpload = async () => {
    if (!realFile) return;
    setPct(0);
    setImportId(undefined);

    // opcionális: cancel támogatás
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await uploadMutation.mutateAsync({
        file: realFile,
        onProgress: setPct,
        signal: abortRef.current.signal,
      });
      setImportId(res.import_id);
    } catch (e) {
      // hiba UI-t kaphat (toast stb.)
      console.error(e);
    }
  };

  const cancelUpload = () => {
    abortRef.current?.abort();
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="border-input hover:border hover:border-dashed hover:border-tealblue data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] not-[has-disabled]:cursor-pointer transition-all duration-300"
      >
        <input
          {...getInputProps({ accept: ".csv,.ofx,.qif" })}
          className="sr-only"
          aria-label="Upload file"
          disabled={Boolean(fileWithPreview) || uploadMutation.isPending}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <UploadIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Upload file</p>
          <p className="text-muted-foreground text-xs">
            Drag & drop or click to browse (max. {formatBytes(maxSize)})
          </p>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {realFile && (
        <div className="space-y-2">
          <div
            key={realFile.name}
            className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <PaperclipIcon
                className="size-4 shrink-0 opacity-60"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">
                  {realFile.name}
                </p>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:border hover:border-muted-foreground/20 transition-all duration-500"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove file"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="flex justify-around items-center w-full mt-8">
            <button
              className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-electric border border-electric cursor-pointer btn-neo px-10 gap-2"
              onClick={startUpload}
              disabled={!canUpload}
            >
              Upload
            </button>
            <button
              className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-tealblue border border-tealblue cursor-pointer btn-neo px-10 gap-2"
              onClick={cancelUpload}
              disabled={!uploadMutation.isPending}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
