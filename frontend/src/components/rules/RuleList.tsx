import type { Rule } from "@/types/rule";
import { BlurFade } from "../magicui/blur-fade";
import { Button } from "../ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useDeleteRule } from "@/hooks/rules/useDeleteRule";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "@/toast";

interface RuleListProps {
  data: Rule[] | undefined;
  setEditing: (rule: Rule) => void;
  setOpen: (open: boolean) => void;
  reset: (rule: Rule) => void;
}

export default function RuleList({
  data,
  setEditing,
  setOpen,
  reset,
}: RuleListProps) {
  const deleteMutation = useDeleteRule();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rules"] });
        notify.success("Szabály sikeresen törölve!");
      },
    });
  };

  const getMatchTypeLabel = (matchType: string) => {
    switch (matchType) {
      case "contains":
        return "Tartalmaz";
      case "regex":
        return "Regex";
      case "equals":
        return "Egyenlő";
      case "amount_range":
        return "Összeg tartomány";
      default:
        return matchType;
    }
  };

  return (
    <ul className="space-y-2">
      {data
        ?.slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((rule: Rule, i) => (
          <BlurFade delay={0.2 + 0.1 * i} direction="up" key={rule.id}>
            <li
              key={rule.id}
              className="flex justify-between items-center bg-graphite/60 p-3 rounded-lg border border-coolgray"
            >
              <div className="flex flex-col gap-1">
                <span className="text-offwhite/80 font-semibold">
                  {rule.name}
                  {!rule.enabled && (
                    <span className="text-xs ml-2 text-offwhite/50">
                      (letiltva)
                    </span>
                  )}
                </span>
                <div className="text-sm text-offwhite/60">
                  <span className="text-limeneon">
                    {getMatchTypeLabel(rule.match_type)}
                  </span>
                  {" → "}
                  <span className="text-tealblue">{rule.match_value}</span>
                  {rule.action_set_category && (
                    <>
                      {"  |  "}
                      <span className="text-limeneon">Kategória: {" "}</span>
                      <span className="text-tealblue">
                        {rule.action_set_category_name}
                      </span>
                    </>
                  )}
                </div>
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
                  className="bg-tealblue/10 text-tealblue border border-tealblue/30 hover:bg-tealblue/20 cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => alert("Előnézet még nem implementálva")}
                  className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20 cursor-pointer"
                  onClick={() => handleDelete(rule.id)}
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
