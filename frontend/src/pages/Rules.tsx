// src/pages/RulesPage.tsx
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
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ruleSchema = z.object({
  name: z.string().min(1),
  match_type: z.enum(["contains", "regex", "equals", "amount_range"]),
  match_value: z.string(),
  action_set_category_id: z.string().nullable().optional(),
  enabled: z.boolean().default(true),
});

export default function RulesPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["rules"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/rules");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const method = editing ? "PATCH" : "POST";
      const url = editing ? `/api/rules/${editing.id}` : "/api/rules";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rules"],
      });
      setOpen(false);
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/rules/${id}`, { method: "DELETE" });
    },
    onSuccess: () => queryClient.invalidateQueries(
      { queryKey: ["rules"] }
    ),
  });

  const { register, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(ruleSchema),
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
          <h2 className="text-xl font-bold">Szabályok</h2>
          <Button
            className="bg-electric text-graphite font-bold"
            onClick={() => {
              reset();
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> Új szabály
          </Button>
        </div>

        <div className="space-y-3">
          {data?.map((rule: any) => (
            <div
              key={rule.id}
              className="flex justify-between items-center bg-graphite/60 p-3 rounded-lg"
            >
              <div>
                <span className="font-semibold">{rule.name}</span>{" "}
                <span className="text-sm text-limeneon">{rule.match_type}</span>{" "}
                →{" "}
                <span className="text-sm text-tealblue">
                  {rule.match_value}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    reset(rule);
                    setEditing(rule);
                    setOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => alert("Preview not yet implemented")}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(rule.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-coolgray border border-limeneon/30">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Szabály szerkesztése" : "Új szabály"}
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
              <Label>Feltétel típusa</Label>
              <select
                {...register("match_type")}
                className="w-full rounded-md bg-graphite text-offwhite p-2"
              >
                <option value="contains">Tartalmaz</option>
                <option value="regex">Regex</option>
                <option value="equals">Egyenlő</option>
                <option value="amount_range">Összeg tartomány</option>
              </select>
            </div>
            <div>
              <Label>Feltétel értéke</Label>
              <Input
                {...register("match_value")}
                className="bg-graphite text-offwhite"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Engedélyezett</Label>
              <Switch {...register("enabled")} checked={watch("enabled")} />
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
