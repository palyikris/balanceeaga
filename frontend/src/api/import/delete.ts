import axios from "axios";


export async function deleteImport(id: string) {
  const apiBase = import.meta.env.VITE_API_BASE;
  await axios.delete(`${apiBase}/imports/${id}`);
  return;
}  