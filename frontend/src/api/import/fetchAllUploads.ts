import type { UploadedFile } from "@/types/uploadedFile";
import api from "../api";

export async function fetchAllUploads() {
  const res = await api.get<UploadedFile[]>(`/imports`);
  return res.data;
}