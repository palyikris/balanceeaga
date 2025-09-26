import { deleteImport } from "@/api/import/delete";
import { notify } from "@/toast";
import { useMutation } from "@tanstack/react-query";


export function useDeleteUpload(id: string) {
  return useMutation({
    mutationKey: ["deleteUpload", id],
    mutationFn: () => deleteImport(id),

    onError: (error) => {
      console.error("Delete failed:", error);
      notify.error("Delete failed! Try again later.");
    }
  });

  
}