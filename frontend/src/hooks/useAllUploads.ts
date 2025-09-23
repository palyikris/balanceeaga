import { fetchAllUploads } from "@/api/fetchAllUploads";
import { type UploadedFile } from "@/types/uploadedFile";
import { useQuery } from "@tanstack/react-query";


export function useAllUploads() {

  return useQuery<UploadedFile[], Error>({
    queryKey: ["all-uploads"],
    queryFn: fetchAllUploads,
    staleTime: 5 * 60 * 1000, // 5 perc
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 2000,
  });

}