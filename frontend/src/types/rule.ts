export const RuleMatchType = {
  CONTAINS: "contains",
  REGEX: "regex",
  EQUALS: "equals",
  AMOUNT_RANGE: "amount_range",
} as const;

export type RuleMatchType = typeof RuleMatchType[keyof typeof RuleMatchType];

export interface Rule {
  id: string;
  user_id: string;
  name: string;
  priority: number;
  enabled: boolean;

  match_type: RuleMatchType;
  match_value: string; // text or JSON (for range, etc.)

  action_set_category?: string | null;
  action_set_category_name?: string; // populated client-side
  action_mark_transfer: boolean;

  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}