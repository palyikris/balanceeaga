import { useQuery } from "@tanstack/react-query";
import { fetchImportStatus, type ImportStatus } from "@/api/import/imports";

export function useImportStatus(importId?: string) {
  const enabled = Boolean(importId);
  return useQuery<ImportStatus, Error>({
    queryKey: ["import-status", importId],
    queryFn: () => fetchImportStatus(importId as string),
    enabled,
    // 1–2 másodpercenként poll-olunk, amíg nincs vége:
    refetchInterval: (data) => {
      if (!data) return 1500;
      
    },
  });
}
