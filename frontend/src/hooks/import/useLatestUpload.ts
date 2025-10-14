import { fetchLatestUpload } from "@/api/import/latestUpload";
import type { UploadedFile } from "@/types/uploadedFile";
import { useQuery } from "@tanstack/react-query";

export function useLatestUpload() {
  return useQuery<UploadedFile, Error>({
    queryKey: ["latest-upload"],
    queryFn: () => fetchLatestUpload(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 2000,
  });
}
