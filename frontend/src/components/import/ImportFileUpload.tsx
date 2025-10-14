"use client"

import { AlertCircleIcon, PaperclipIcon, UploadIcon, XIcon } from "lucide-react"

import { formatBytes, useFileUpload } from "@/hooks/import/use-file-upload";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useUploadImport } from "@/hooks/import/useUploadImport";
import { useImportStatus } from "@/hooks/import/useImportStatus";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "@/toast";

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

  const queryClient = useQueryClient();
  queryClient.prefetchQuery({ queryKey: ["latest-upload"] });

  const startUpload = async () => {
    if (!realFile) return;
    setPct(0);
    setImportId(undefined);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await uploadMutation.mutateAsync({
        file: realFile,
        onProgress: setPct,
        signal: abortRef.current.signal,
      });
      setImportId(res.import_id);
      await queryClient.refetchQueries({
        queryKey: ["latest-upload"],
        type: "all",
      });

      notify.success("File uploaded successfully!");
    } catch (e) {
      console.error(e);
      notify.error("Failed to upload file!");
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
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">
                  {realFile.name}
                </p>
                {(uploadMutation.isPending || status) && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground">
                        {uploadMutation.isPending
                          ? `Uploading... ${pct}%`
                          : status?.status === "processing"
                          ? "Processing..."
                          : status?.status === "done"
                          ? `Done! ${status.count || 0} transactions processed`
                          : status?.status === "failed"
                          ? `Failed${status.error ? `: ${status.error}` : ""}`
                          : "Uploaded"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {uploadMutation.isPending ? `${pct}%` : ""}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          status?.status === "failed"
                            ? "bg-electric"
                            : status?.status === "done"
                            ? "bg-limeneon"
                            : status?.status === "processing"
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-tealblue"
                        }`}
                        style={{
                          width: uploadMutation.isPending
                            ? `${pct}%`
                            : status?.status === "processing" ||
                              status?.status === "done" ||
                              status?.status === "failed"
                            ? "100%"
                            : "100%",
                        }}
                      />
                    </div>
                  </div>
                )}
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
            {!uploadMutation.isPending && !status ? (
              <>
                <button
                  className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-electric border border-electric cursor-pointer btn-neo px-10 gap-2"
                  onClick={startUpload}
                  disabled={!canUpload}
                >
                  Upload
                </button>
                <button
                  className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-tealblue border border-tealblue cursor-pointer btn-neo px-10 gap-2"
                  onClick={() => removeFile(files[0]?.id)}
                >
                  Remove
                </button>
              </>
            ) : uploadMutation.isPending ? (
              <>
                <button
                  className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-gray-500 border border-gray-500 cursor-not-allowed btn-neo px-10 gap-2"
                  disabled
                >
                  Uploading... {pct}%
                </button>
                <button
                  className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-red-500 border border-red-500 cursor-pointer btn-neo px-10 gap-2"
                  onClick={cancelUpload}
                >
                  Cancel
                </button>
              </>
            ) : status?.status === "processing" ? (
              <button
                className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-yellow-500 border border-yellow-500 cursor-not-allowed btn-neo px-10 gap-2"
                disabled
              >
                Processing...
              </button>
            ) : status?.status === "done" ? (
              <button
                className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-green-500 border border-green-500 cursor-not-allowed btn-neo px-10 gap-2"
                disabled
              >
                ✓ Complete ({status.count || 0} transactions)
              </button>
            ) : status?.status === "failed" ? (
              <>
                <button
                  className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-red-500 border border-red-500 cursor-not-allowed btn-neo px-10 gap-2"
                  disabled
                >
                  ✗ Failed
                </button>
                <button
                  className="flex items-center justify-center w-auto py-3 font-extrabold rounded-lg text-tealblue border border-tealblue cursor-pointer btn-neo px-10 gap-2"
                  onClick={() => {
                    removeFile(files[0]?.id);
                    setImportId(undefined);
                    setPct(0);
                  }}
                >
                  Try Again
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
