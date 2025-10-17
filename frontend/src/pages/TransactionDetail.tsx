import { useParams, useNavigate } from "react-router-dom";
// import { useUpdateTransactionCategory } from "@/hooks/transactions/useUpdateTransactionCategory";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useTransaction } from "@/hooks/transactions/useTransaction";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useAllCategories } from "@/hooks/categories/useAllCategories";
import { useSetCategory } from "@/hooks/transactions/useSetCategory";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "@/toast";

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: tx, isLoading } = useTransaction(id || "");
  // const updateCategory = useUpdateTransactionCategory();
  const deleteTx = useDeleteTransaction();
  const setCategory = useSetCategory();
  const queryClient = useQueryClient();

  const { isLoading: categoryLoading, data: categories } = useAllCategories();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    tx?.category?.id
  );

  if (isLoading || categoryLoading)
    return (
      <Card className="max-w-4xl mx-auto p-6 bg-graphite-900/80 border border-offwhite/10 text-offwhite bg-graphite/40 shadow-lg mt-30">
        <Spinner color="#00B3B3" size={25}></Spinner>
        <p className="text-offwhite/80">Loading...</p>
      </Card>
    );
  if (!tx)
    return (
      <Card className="max-w-4xl mx-auto p-6 bg-graphite-900/80 border border-offwhite/10 text-offwhite bg-graphite/40 shadow-lg mt-30">
        <h2 className="text-limeneon font-bold text-xl mb-4">
          <TypingAnimation style={{ fontSize: "1.5rem" }}>
            Transaction details.
          </TypingAnimation>
        </h2>
        <p className="text-offwhite">Cannot find transaction. :(</p>
        <div className="space-y-2 text-sm border-l-2 border-tealblue/80 pl-8"></div>
      </Card>
    );

  const handleSaveCategory = () => {
    if (!selectedCategory) return;
    setCategory.mutate(
      {
        transactionId: tx.id,
        categoryId: selectedCategory,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transaction", tx.id] });
          notify.success("Kategória sikeresen frissítve.");
        },
      }
    );
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
          Tranzakció részletei.
        </TypingAnimation>
      </h2>

      <div className="space-y-2 text-sm border-l-2 border-tealblue/80 pl-8">
        <BlurFade inView delay={0.1} direction="right">
          <p>
            <span className="text-offwhite/50">Dátum:</span> {tx.booking_date}
          </p>
        </BlurFade>
        <BlurFade inView delay={0.2} direction="right">
          <p>
            <span className="text-offwhite/50">Leírás:</span>{" "}
            {tx.description_raw}
          </p>
        </BlurFade>
        <BlurFade inView delay={0.3} direction="right">
          <p>
            <span className="text-offwhite/50">Összeg:</span>{" "}
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
            <span className="text-offwhite/50">
              Kedvezményezett / Számlatulajdonos:
            </span>{" "}
            {tx.counterparty || "-"}
          </p>
        </BlurFade>
      </div>

      {/* Category edit section */}
      <BlurFade className="mt-6" inView delay={0.5} direction="up">
        <p className="text-offwhite/70 mb-2">Kategória</p>
        <div className="flex gap-3 items-center">
          <select
            className="rounded-md bg-graphite text-offwhite py-2 px-4 border border-coolgray"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            defaultValue={tx.category?.id}
          >
            <option value="">
              {tx.category
                ? "Változtasd meg a kategóriát"
                : "Válassz kategóriát"}
            </option>
            {[...(categories || [])]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <Button
            onClick={handleSaveCategory}
            // disabled={!selectedCategory || updateCategory.isPending}
            className="bg-limeneon/10 text-limeneon border border-limeneon/30 hover:bg-limeneon/20"
          >
            Kategória {tx.category ? "megváltoztatása" : "kiválasztása"}
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
          Vissza a Tranzakciókhoz
        </Button>
        <Button
          onClick={handleDelete}
          disabled={deleteTx.isPending}
          className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20 cursor-pointer"
        >
          Tranzakció törlése
        </Button>
      </BlurFade>
    </Card>
  );
}
