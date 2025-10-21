import type { UploadedFile } from "@/types/uploadedFile";
import api from "../api";

export async function fetchLatestUpload() {
  const res = await api.get<UploadedFile>(`/imports/latest`);
  return res.data;
}