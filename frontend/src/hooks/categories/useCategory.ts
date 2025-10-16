import { fetchCategoryById } from "@/api/categories/fetchCategories";
import { notify } from "@/toast";
import { useMutation } from "@tanstack/react-query";


export const useCategory = (id: string) => {
  return useMutation({
    mutationKey: ["category", id],
    mutationFn: () => fetchCategoryById(id),
    retry: 1,
    retryDelay: 10000,
    onError: (error) => {
      console.error("Fetch category failed:", error);
      notify.error("Fetch category failed! Try again later.");
    }
  });
}

