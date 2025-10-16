import { deleteCategoryById } from "@/api/categories/deleteCategory"
import { notify } from "@/toast";
import { useMutation } from "@tanstack/react-query"


export const useDeleteCategory = () => {
  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: string) => deleteCategoryById(id),
    retry: 1,
    retryDelay: 10000,
    onError: (error) => {
      console.error("Error deleting category:", error);
      notify.error("Failed to delete category. Please try again.");
    }
  });
}