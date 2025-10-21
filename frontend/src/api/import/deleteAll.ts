import api from "../api";

export async function deleteAllUploads() {
  await api.delete(`/imports/delete_all`);
  return;
}
