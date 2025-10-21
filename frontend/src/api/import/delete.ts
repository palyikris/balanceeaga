import api from "../api";

export async function deleteImport(id: string) {
  await api.delete(`/imports/${id}`);
  return;
}
