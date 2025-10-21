// api.ts
import { supabase } from "@/lib/supabase";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
    config.headers["X-User-ID"] = session.user.id;
  }

  return config;
});

export default api;
