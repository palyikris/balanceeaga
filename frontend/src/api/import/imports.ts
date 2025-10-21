import api from "../api";

export type UploadResponse = { import_id: string };

export async function uploadImport(
  file: File,
  onProgress?: (pct: number) => void,
  signal?: AbortSignal
): Promise<UploadResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await api.post<UploadResponse>(`/imports`, form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (evt) => {
      if (!onProgress) return;
      const total = evt.total ?? 1;
      onProgress(Math.round((evt.loaded * 100) / total));
    },
    signal,
    withCredentials: true,
  });
  return res.data;
}

export type ImportStatus =
  | { id: string; status: "uploaded" | "processing" | "done"; count?: number }
  | { id: string; status: "failed"; error?: string };

export async function fetchImportStatus(id: string): Promise<ImportStatus> {
  const res = await api.get<ImportStatus>(`/imports/${id}`);
  return res.data;
}
