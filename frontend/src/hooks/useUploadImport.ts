import { useMutation } from "@tanstack/react-query";
import { uploadImport, type UploadResponse } from "@/api/imports";

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
  });
}
