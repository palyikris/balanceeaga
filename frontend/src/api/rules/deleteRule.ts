import api from "../api";

export async function deleteRule(id: string): Promise<void> {
  await api.delete(`/rules/${id}`);
}
