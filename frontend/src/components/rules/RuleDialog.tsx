import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Rule } from "@/types/rule";
import { Button } from "../ui/button";
import type { UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
import type { Category } from "@/types/category";


interface RuleDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editing: Rule | null;
  handleSubmit: UseFormHandleSubmit<{
    name: string;
    match_type: "contains" | "regex" | "equals" | "amount_range";
    match_value: string;
    action_set_category?: string | null;
    enabled: boolean;
    priority: number;
    action_mark_transfer: boolean;
  }>;
  onSubmit: (
    values: Omit<Rule, "id" | "created_at" | "updated_at" | "user_id">
  ) => void;
  register: UseFormRegister<{
    name: string;
    match_type: "contains" | "regex" | "equals" | "amount_range";
    match_value: string;
    action_set_category?: string | null;
    enabled: boolean;
    priority: number;
    action_mark_transfer: boolean;
  }>;
  watch: UseFormWatch<{
    name: string;
    match_type: "contains" | "regex" | "equals" | "amount_range";
    match_value: string;
    action_set_category?: string | null;
    enabled: boolean;
    priority: number;
    action_mark_transfer: boolean;
  }>;
  categories: Category[];
}

export default function RuleDialog({
  open,
  setOpen,
  editing,
  handleSubmit,
  onSubmit,
  register,
  watch,
  categories,
}: RuleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-graphite border border-limeneon/30">
        <DialogHeader>
          <DialogTitle className="text-electric">
            {editing ? "Szabály szerkesztése." : "Új szabály."}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="space-y-3"
        >
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
              className="w-full rounded-md bg-graphite text-offwhite p-2 border border-coolgray"
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
          <div>
            <Label>Prioritás</Label>
            <Input
              {...register("priority", { valueAsNumber: true })}
              type="number"
              className="bg-graphite text-offwhite"
            />
          </div>
          <div>
            <Label>Kategória beállítása</Label>
            <select
              {...register("action_set_category")}
              className="w-full rounded-md bg-graphite text-offwhite p-2 border border-coolgray"
            >
              {[...categories]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Engedélyezett</Label>
            <Switch {...register("enabled")} checked={watch("enabled")} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Átvezetés jelölése</Label>
            <Switch
              {...register("action_mark_transfer")}
              checked={watch("action_mark_transfer")}
            />
          </div>
          <Button
            type="submit"
            className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20 cursor-pointer w-full"
          >
            {editing ? "Mentés" : "Létrehozás"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
