import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Category } from "@/types/category";
import { Button } from "../ui/button";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";


interface CategoryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editing: Category | null;
  handleSubmit: UseFormHandleSubmit<
    {
      id: string;
      name: string;
      type: "income" | "expense" | "transfer";
      user_id: string;
    },
    {
      id: string;
      name: string;
      type: "income" | "expense" | "transfer";
      user_id: string;
    }
  >;
  onSubmit: (values: Category) => void;
  register: UseFormRegister<{
    id: string;
    name: string;
    type: "income" | "expense" | "transfer";
    user_id: string;
  }>;
}

export default function CategoryDialog({
  open,
  setOpen,
  editing,
  handleSubmit,
  onSubmit,
  register,
}: CategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-graphite border border-limeneon/30">
        <DialogHeader>
          <DialogTitle className="text-electric">
            {editing ? "Kategória szerkesztése." : "Új kategória."}
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
            className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20 cursor-pointer w-full"
          >
            {editing ? "Mentés" : "Létrehozás"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
