import axios from "axios";

export async function deleteAllUploads() {
  const apiBase = import.meta.env.VITE_API_BASE;
  await axios.delete(`${apiBase}/imports/delete_all`)
  return;
}