import { useParams, useNavigate } from "react-router-dom";
// import { useUpdateTransactionCategory } from "@/hooks/transactions/useUpdateTransactionCategory";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useTransaction } from "@/hooks/transactions/useTransaction";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: tx, isLoading } = useTransaction(id || "");
  // const updateCategory = useUpdateTransactionCategory();
  const deleteTx = useDeleteTransaction(id || "");

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    tx?.category?.id
  );

  if (isLoading) return <p className="text-offwhite/70">Loading...</p>;
  if (!tx) return <p className="text-electric/70">Transaction not found.</p>;

  const handleSaveCategory = () => {
    if (!selectedCategory) return;
    // updateCategory.mutate({ id: tx.id, category_id: selectedCategory });
  };

  const handleDelete = () => {
    deleteTx.mutate(tx.id, {
      onSuccess: () => navigate("/transactions"),
    });
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-graphite-900/80 border border-offwhite/10 text-offwhite bg-graphite/40 shadow-lg mt-30">
      <h2 className="text-limeneon font-bold text-xl mb-4">
        <TypingAnimation style={{ fontSize: "1.5rem" }}>
          Transaction details
        </TypingAnimation>
      </h2>

      <div className="space-y-2 text-sm border-l-2 border-tealblue/80 pl-8">
        <BlurFade inView delay={0.1} direction="right">
          <p>
            <span className="text-offwhite/50">Date:</span> {tx.booking_date}
          </p>
        </BlurFade>
        <BlurFade inView delay={0.2} direction="right">
          <p>
            <span className="text-offwhite/50">Description:</span>{" "}
            {tx.description_raw}
          </p>
        </BlurFade>
        <BlurFade inView delay={0.3} direction="right">
          <p>
            <span className="text-offwhite/50">Amount:</span>{" "}
            <span
              className={`font-semibold ${
                parseFloat(tx.amount) > 0 ? "text-limeneon" : "text-electric"
              }`}
            >
              {tx.amount} {tx.currency}
            </span>
          </p>
        </BlurFade>
        <BlurFade inView delay={0.4} direction="right">
          <p>
            <span className="text-offwhite/50">Counterparty:</span>{" "}
            {tx.counterparty || "-"}
          </p>
        </BlurFade>
      </div>

      {/* Category edit section */}
      <BlurFade className="mt-6" inView delay={0.5} direction="up">
        <p className="text-offwhite/70 mb-2">Category</p>
        <div className="flex gap-3 items-center">
          <Select
            onValueChange={setSelectedCategory}
            defaultValue={tx.category?.id || undefined}
          >
            <SelectTrigger className="w-[220px] bg-graphite-900 border border-offwhite/10 text-offwhite/80">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Groceries">Groceries</SelectItem>
              <SelectItem value="Food & Drinks">Food & Drinks</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleSaveCategory}
            // disabled={!selectedCategory || updateCategory.isPending}
            className="bg-limeneon/10 text-limeneon border border-limeneon/30 hover:bg-limeneon/20"
          >
            {tx.category ? "Update" : "Add"} Category
          </Button>
        </div>
      </BlurFade>

      {/* Delete button */}
      <BlurFade
        className="mt-8 flex justify-between items-center"
        inView
        delay={0.6}
        direction="up"
      >
        <Button
          variant="secondary"
          onClick={() => navigate("/transactions")}
          className="bg-tealblue/10 text-tealblue border border-tealblue/30 hover:bg-tealblue/20 cursor-pointer"
        >
          Back to Transactions
        </Button>
        <Button
          onClick={handleDelete}
          disabled={deleteTx.isPending}
          className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20 cursor-pointer"
        >
          Delete Transaction
        </Button>
      </BlurFade>
    </Card>
  );
}
