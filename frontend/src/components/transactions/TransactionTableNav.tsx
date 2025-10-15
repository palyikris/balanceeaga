import type { Transaction } from "@/types/transaction";
import { BlurFade } from "../magicui/blur-fade";


interface TransactionTableNavProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  data: Transaction[];
}


export default function TransactionTableNav(props: TransactionTableNavProps) {

  const { step, setStep, currentPage, setCurrentPage, data } = props;

  return (
    <tr>
      <td colSpan={5} className="p-4">
        <BlurFade
          className="flex justify-center gap-4"
          inView
          delay={1}
          direction="up"
        >
          <button
            className="px-4 py-2 bg-limeneon/10 text-limeneon rounded disabled:opacity-50 w-xs cursor-pointer"
            onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
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
            Next
          </button>
        </BlurFade>
      </td>
    </tr>
  );
}