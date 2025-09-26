import axios from "axios";

export type UploadResponse = { import_id: string };
export type UploadVars = { file: File; onProgress?: (pct: number) => void };

export async function uploadImport({
  file,
  onProgress,
}: UploadVars): Promise<UploadResponse> {
  const form = new FormData();
  form.append("file", file);

  const apiBase = import.meta.env.VITE_API_BASE;
  const res = await axios.post<UploadResponse>(`${apiBase}/imports`, form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (evt) => {
      if (!onProgress) return;
      const total = evt.total ?? 1;
      const pct = Math.round((evt.loaded * 100) / total);
      onProgress(pct);
    },
  });
  return res.data;
}
