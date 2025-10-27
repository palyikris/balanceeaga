// src/pages/CategoriesPage.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form"; // No change needed here
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { Category } from "@/types/category";
import { useAllCategories } from "@/hooks/categories/useAllCategories";
import CategoryDialog from "@/components/category/CategoryDialog";
import CategoryList from "@/components/category/CategoryList";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "A név kötelező"),
  type: z.enum(["income", "expense", "transfer"]),
  user_id: z.string(),
});

export default function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const { data, isLoading } = useAllCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const { register, handleSubmit, reset } = useForm<
    z.infer<typeof categorySchema>
  >({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: "",
      name: "",
      type: "expense",
      user_id: "dev-user",
    },
  });

  const onSubmit = (values: Category) => {
    console.log(editing);
    if (editing) {
      const payload: Omit<Category, "id" | "reference_count"> = {
        name: values.name,
        type: values.type,
        user_id: values.user_id,
      };
      updateCategory.mutate(
        {
          id: editing.id,
          data: {
            ...payload,
          },
        },
        {
          onSuccess: () => {
            setOpen(false);
            reset();
            setEditing(null);
          },
        }
      );
      return;
    }

    const payload: Omit<Category, "id" | "reference_count"> = {
      name: values.name,
      type: values.type,
      user_id: values.user_id,
    };

    createCategory.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        reset();
        setEditing(null);
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-10 text-offwhite">
        <Spinner color="#00B3B3" size={30} className="animate-spin" />
      </div>
    );

  return (
    <div className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
      <Card className="bg-graphite/50 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-tealblue">
            <TypingAnimation>Kategóriák.</TypingAnimation>
          </h2>
          <BlurFade inView delay={0.1} direction="left">
            <Button
              className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20 cursor-pointer"
              onClick={() => {
                reset();
                setEditing(null);
                setOpen(true);
              }}
            >
              <Plus className="mr-1 h-4 w-4" /> Új kategória
            </Button>
          </BlurFade>
        </div>

        <CategoryList
          data={data}
          setEditing={setEditing}
          setOpen={setOpen}
          reset={reset}
        ></CategoryList>
      </Card>

      <CategoryDialog
        open={open}
        setOpen={setOpen}
        editing={editing}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      ></CategoryDialog>
    </div>
  );
}
