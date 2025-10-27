import type { Category } from "@/types/category";
import { BlurFade } from "../magicui/blur-fade";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "@/toast";

interface CategoryListProps {
  data: Category[] | undefined;
  setEditing: (cat: Category) => void;
  setOpen: (open: boolean) => void;
  reset: (cat: Category) => void;
}

export default function CategoryList({
  data,
  setEditing,
  setOpen,
  reset,
}: CategoryListProps) {
  const deleteMutation = useDeleteCategory();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        notify.success("Category deleted successfully!");
      },
    });
  };

  return (
    <ul className="space-y-2">
      {data
        ?.slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cat: Category, i) => (
          <BlurFade delay={0.2 + 0.1 * i} direction="up" key={cat.id}>
            <li
              key={cat.id}
              className="flex justify-between items-center bg-graphite/60 p-3 rounded-lg border border-coolgray"
            >
              <span className="text-offwhite/80">
                {cat.name}{" "}
                <span
                  className={`text-xs font-bold bg-${
                    cat.type == "expense"
                      ? "limeneon"
                      : cat.type == "income"
                      ? "electric"
                      : "tealblue"
                  } ml-4 text-coolgray py-1 px-4 rounded`}
                >
                  {cat.type}
                </span>
                {cat.reference_count > 0 ? (
                  <span className="ml-2 border-l border-offwhite/30 pl-2 text-offwhite/50 text-sm">
                    {" "}
                    Használja{" "}
                    <span className="text-limeneon">
                      {cat.reference_count}
                    </span>{" "}
                    tranzakció.
                  </span>
                ) : (
                  <span className="ml-2 border-l border-offwhite/30 pl-2 text-electric/50 text-sm">
                    {" "}
                    Nem használja tranzakció.
                  </span>
                )}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    reset(cat);
                    setEditing(cat);
                    setOpen(true);
                  }}
                  className="bg-tealblue/10 text-tealblue border border-tealblue/30 hover:bg-tealblue/20 cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20 cursor-pointer"
                  onClick={() => handleDelete(cat.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </li>
          </BlurFade>
        ))}
    </ul>
  );
}