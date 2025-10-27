// src/pages/RulesPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { Rule } from "@/types/rule";
import { useAllRules } from "@/hooks/rules/useAllRules";
import RuleDialog from "@/components/rules/RuleDialog";
import RuleList from "@/components/rules/RuleList";
import { useCreateRule } from "@/hooks/rules/useCreateRule";
import { useUpdateRule } from "@/hooks/rules/useUpdateRule";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useAllCategories } from "@/hooks/categories/useAllCategories";

const ruleSchema = z.object({
  name: z.string().min(1, "A név kötelező"),
  match_type: z.enum(["contains", "regex", "equals", "amount_range"]),
  match_value: z.string().min(1, "A feltétel értéke kötelező"),
  action_set_category: z.string().nullable().optional(),
  enabled: z.boolean(),
  priority: z.number(),
  action_mark_transfer: z.boolean(),
});

export default function RulesPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Rule | null>(null);
  const { data, isLoading } = useAllRules();
  const createRule = useCreateRule();
  const updateRule = useUpdateRule();

  const { data: categories, isLoading: categoriesLoading } = useAllCategories();

  const { register, handleSubmit, reset, watch } = useForm<
    z.infer<typeof ruleSchema>
  >({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: "",
      match_type: "contains",
      match_value: "",
      action_set_category: null,
      enabled: true,
      priority: 0,
      action_mark_transfer: false,
    },
  });

  const onSubmit = (
    values: Omit<Rule, "id" | "created_at" | "updated_at" | "user_id">
  ) => {
    if (editing) {
      const payload: Partial<Omit<Rule, "id" | "created_at" | "updated_at">> = {
        name: values.name,
        match_type: values.match_type,
        match_value: values.match_value,
        action_set_category: values.action_set_category,
        enabled: values.enabled,
        priority: values.priority,
        action_mark_transfer: values.action_mark_transfer,
      };
      updateRule.mutate(
        {
          id: editing.id,
          data: payload,
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

    const payload: Omit<Rule, "id" | "created_at" | "updated_at"> = {
      name: values.name,
      match_type: values.match_type,
      match_value: values.match_value,
      action_set_category: values.action_set_category,
      enabled: values.enabled,
      priority: values.priority,
      user_id: "dev-user",
      action_mark_transfer: values.action_mark_transfer,
    };

    createRule.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        reset();
        setEditing(null);
      },
    });
  };

  if (isLoading || categoriesLoading)
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
            <TypingAnimation>Szabályok.</TypingAnimation>
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
              <Plus className="mr-1 h-4 w-4" /> Új szabály
            </Button>
          </BlurFade>
        </div>

        <RuleList
          data={data}
          setEditing={setEditing}
          setOpen={setOpen}
          reset={reset}
        ></RuleList>
      </Card>

      <RuleDialog
        open={open}
        setOpen={setOpen}
        editing={editing}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        watch={watch}
        categories={categories || []}
      ></RuleDialog>
    </div>
  );
}
