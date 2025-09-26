import { deleteAllUploads } from "@/api/import/deleteAll";
import { notify } from "@/toast";
import { useMutation } from "@tanstack/react-query";


export function useDeleteAllUploads() {
  return useMutation({
    mutationKey: ["delete-all-uploads"],
    mutationFn: deleteAllUploads,
    onError: () => {
      console.error("Error deleting all uploads");
      notify.error("Error deleting all uploads");
    },
    onSuccess: () => {
      notify.success("All uploads deleted successfully");
    },
  });
}