import type { Transaction } from "@/types/transaction";
import { BlurFade } from "../magicui/blur-fade";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRecategorizeTransactions } from "@/hooks/transactions/useRecategorizeTransactions";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "@/toast";

interface TransactionTableNavProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  data: Transaction[];
}

export default function TransactionTableNav(props: TransactionTableNavProps) {
  const { step, setStep, currentPage, setCurrentPage, data } = props;

  const recategorize = useRecategorizeTransactions();
  const queryClient = useQueryClient();

  const handleRecategorize = () => {
    recategorize.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        notify.success("Újrakategorizálás sikeres.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
    });
  };

  return (
    <tr>
      <td className="relative border-t border-tealblue">
        <BlurFade
          className="flex justify-center gap-4 px-4"
          inView
          delay={1}
          direction="up"
        >
          <Button
            className="bg-tealblue/10 text-tealblue border border-tealblue/30 hover:bg-tealblue/20 cursor-pointer w-full"
            onClick={handleRecategorize}
          >
            Újrakategorizálás
          </Button>
          <Button className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20 cursor-pointer w-full">
            Összes törlése
          </Button>
          <span className="absolute top-1/2 -translate-y-1/2 right-0 h-1/2 w-[1px] bg-electric"></span>
        </BlurFade>
      </td>
      <td colSpan={3} className="p-4 border-t border-r border-tealblue h-full">
        <BlurFade
          className="flex justify-center gap-4"
          inView
          delay={1}
          direction="up"
        >
          <button
            className="px-4 py-2 bg-limeneon/10 text-limeneon rounded disabled:opacity-50 w-xs cursor-pointer"
            onClick={() =>
              setCurrentPage((prev: number) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
          >
            Előző
          </button>
          <input
            type="text"
            onChange={(e) => {
              const step = parseInt(e.target.value);
              if (!isNaN(step) && step > 0) {
                setStep(step);
                setCurrentPage(1);
              }
            }}
            className="w-16 text-center bg-graphite-900 border border-coolgray rounded text-offwhite outline-none"
            value={step}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setStep((prev) => {
                  const next = prev + 1;
                  setCurrentPage(1);
                  return next;
                });
              }

              if (e.key === "ArrowDown") {
                e.preventDefault();
                setStep((prev) => {
                  const next = Math.max(prev - 1, 1);
                  setCurrentPage(1);
                  return next;
                });
              }
            }}
          />
          <button
            className="px-4 py-2 bg-limeneon/10 text-limeneon rounded disabled:opacity-50 w-xs cursor-pointer"
            onClick={() =>
              setCurrentPage((prev) =>
                prev * step >= data.length ? prev : prev + 1
              )
            }
            disabled={currentPage * step >= data.length}
          >
            Következő
          </button>
        </BlurFade>
      </td>
      <td className="text-offwhite flex flex-row justify-center items-center">
        <BlurFade
          inView
          delay={1}
          direction="up"
          className="flex flex-row justify-center items-center gap-2 p-4 w-full"
        >
          <Input
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (
                !isNaN(page) &&
                page > 0 &&
                page <= Math.ceil(data.length / step)
              ) {
                setCurrentPage(page);
              }
            }}
            className="w-12 text-center bg-graphite-900 border border-coolgray rounded text-offwhite outline-none"
            onKeyDown={(k) => {
              k.preventDefault();
              if (k.key === "ArrowUp") {
                setCurrentPage((prev) => {
                  const next = prev + 1;
                  if (next > Math.ceil(data.length / step)) return prev;
                  return next;
                });
              }
              if (k.key === "ArrowDown") {
                setCurrentPage((prev) => {
                  const next = prev - 1;
                  if (next < 1) return prev;
                  return next;
                });
              }
            }}
          ></Input>
          / {data.length / step === 0 ? 1 : Math.ceil(data.length / step)}
        </BlurFade>
      </td>
    </tr>
  );
}