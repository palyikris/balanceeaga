import { updateCategory } from "@/api/categories/updateCategory";
import { notify } from "@/toast";
import type { Category } from "@/types/category";
import { useMutation } from "@tanstack/react-query";


export const useUpdateCategory = ( ) => {
  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<Category, "id" | "reference_count">;
    }) => updateCategory(id, data),
    retry: 1,
    retryDelay: 10000,
    onError: (error) => {
      console.error("Error updating category:", error);
      notify.error("Failed to update category. Please try again.");
    },
  });
}