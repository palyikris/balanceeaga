import { fetchLatestUpload } from "@/api/latestUpload";
import type { UploadedFile } from "@/types/uploadedFile";
import { useQuery } from "@tanstack/react-query";



export function useLatestUpload() {
  return useQuery<UploadedFile, Error>({
    queryKey: ["latest-upload"],
    queryFn: () => fetchLatestUpload(),
    staleTime: 5 * 60 * 1000, // 5 perc
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: true,
    retry: 1,
    retryDelay: 2000,
  });
}