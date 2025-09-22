import type { UploadedFile } from "@/types/uploadedFile";
import axios from "axios";

export async function fetchLatestUpload() {
  const apiBase = import.meta.env.VITE_API_BASE;
  const res = await axios.get<UploadedFile>(
    `${apiBase}/imports/latest`,
  );
  return res.data;
}