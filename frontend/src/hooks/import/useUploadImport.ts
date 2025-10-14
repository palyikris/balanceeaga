import { useMutation } from "@tanstack/react-query";
import { uploadImport, type UploadResponse } from "@/api/import/imports";
import { notify } from "@/toast";

export function useUploadImport() {
  return useMutation<
    UploadResponse,
    Error,
    {
      file: File;
      onProgress?: (p: number) => void;
      signal?: AbortSignal;
    }
  >({
    mutationFn: ({ file, onProgress, signal }) =>
      uploadImport(file, onProgress, signal),
    onError: (error) => {
      console.error("Upload failed:", error);
      notify.error("Upload failed! Try again later.");
    },
  });
}
