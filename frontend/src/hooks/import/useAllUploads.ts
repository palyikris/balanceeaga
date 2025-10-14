import { fetchAllUploads } from "@/api/import/fetchAllUploads";
import { type UploadedFile } from "@/types/uploadedFile";
import { useQuery } from "@tanstack/react-query";

export function useAllUploads() {
  return useQuery<UploadedFile[], Error>({
    queryKey: ["all-uploads"],
    queryFn: fetchAllUploads,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}
