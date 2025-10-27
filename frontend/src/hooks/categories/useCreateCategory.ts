import { createCategory } from "@/api/categories/createCategory";
import { notify } from "@/toast";
import type { Category } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: Omit<Category, "id" | "reference_count">) =>
      createCategory(data),
    retry: 1,
    retryDelay: 10000,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notify.success("Category created successfully.");
    },
    onError: (error) => {
      console.error("Error creating category:", error);
      notify.error("Failed to create category. Please try again.");
    },
  });
}