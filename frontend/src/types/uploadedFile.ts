export interface UploadedFile {
  id: string; // UUID
  user_id: string; // Supabase user UUID string
  original_name: string;
  storage_path: string; // relative path within MEDIA_ROOT
  mime_type?: string | null;
  size_bytes?: number | null;
  checksum_sha256?: string | null;

  adapter_hint: string;
  source_hint: string;
  status: string;
  error_message?: string | null;

  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}