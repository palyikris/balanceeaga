import { fetchLatestUpload } from "@/api/latestUpload";
import type { UploadedFile } from "@/types/uploadedFile";
import { useQuery } from "@tanstack/react-query";



export function useLatestUpload() {

  console.log("useLatestUpload called");

  return useQuery<UploadedFile, Error>({
    queryKey: ["latest-upload"],
    queryFn: () => fetchLatestUpload(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
    retryDelay: 2000,
  });
}