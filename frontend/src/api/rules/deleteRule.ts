import axios from "axios";


export async function deleteRule(id: string): Promise<void> {
  const apiBase = import.meta.env.VITE_API_BASE;
  await axios.delete(`${apiBase}/rules/${id}`);
}
