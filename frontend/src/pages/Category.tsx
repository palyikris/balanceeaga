// src/pages/CategoriesPage.tsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
  name: z.string().min(1, "A név kötelező"),
  type: z.enum(["income", "expense", "transfer"]),
  parent_id: z.string().nullable().optional(),
});

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/categories");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const method = editing ? "PATCH" : "POST";
      const url = editing ? `/api/categories/${editing.id}` : "/api/categories";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      setOpen(false);
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (values: any) => mutation.mutate(values);

  if (isLoading)
    return (
      <div className="flex justify-center p-10 text-offwhite">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="p-6 text-offwhite">
      <Card className="bg-coolgray p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Kategóriák</h2>
          <Button
            className="bg-electric text-graphite font-bold"
            onClick={() => {
              reset();
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> Új kategória
          </Button>
        </div>

        <ul className="space-y-2">
          {data?.map((cat: any) => (
            <li
              key={cat.id}
              className="flex justify-between items-center bg-graphite/60 p-3 rounded-lg"
            >
              <span>
                {cat.name}{" "}
                <span className="text-xs text-limeneon">{cat.type}</span>
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
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(cat.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-coolgray border border-limeneon/30">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Kategória szerkesztése" : "Új kategória"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Label>Név</Label>
              <Input
                {...register("name")}
                className="bg-graphite text-offwhite"
              />
            </div>
            <div>
              <Label>Típus</Label>
              <select
                {...register("type")}
                className="w-full rounded-md bg-graphite text-offwhite p-2"
              >
                <option value="expense">Kiadás</option>
                <option value="income">Bevétel</option>
                <option value="transfer">Átvezetés</option>
              </select>
            </div>
            <Button
              type="submit"
              className="w-full bg-limeneon text-graphite font-bold"
            >
              {editing ? "Mentés" : "Létrehozás"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
