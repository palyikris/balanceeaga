"use client";

import type { Transaction } from "@/types/transaction";
import { BlurFade } from "../magicui/blur-fade";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import { useNavigate } from "react-router-dom";

interface DataTableProps {
  data?: Transaction[];
}

export default function TransactionTable({ data = [] }: DataTableProps) {
  const [step, setStep] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-tealblue text-sm text-offwhite/80">
          <th className="p-2">Date</th>
          <th className="p-2">Description</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Category</th>
        </tr>
      </thead>
      <tbody>
        {data
          ?.slice((currentPage - 1) * step, currentPage * step)
          .map((tx: Transaction, i) => (
            <tr
              key={tx.id}
              className="border-b border-gray-800 hover:bg-gray-800/40 text-offwhite/50 cursor-pointer"
              onClick={() => navigate(`/transactions/${tx.id}`)}
            >
              <td className="p-2 py-3">
                <BlurFade inView delay={i * 0.2}>
                  {tx.booking_date}
                </BlurFade>
              </td>
              <td className="p-2">
                <BlurFade inView delay={i * 0.2}>
                  {tx.description_raw}
                </BlurFade>
              </td>
              <td
                className={`p-2 font-medium ${
                  !tx.amount.startsWith("-")
                    ? "text-limeneon/90"
                    : "text-electric/90"
                }`}
              >
                <BlurFade inView delay={i * 0.2}>
                  {tx.amount} {tx.currency}
                </BlurFade>
              </td>
              <td className="p-2">
                <BlurFade inView delay={i * 0.2}>
                  {tx.category?.name || "-"}
                </BlurFade>
              </td>
              {/* <td className="p-2 flex flex-row gap-2">
                {!tx.category && (
                  <BlurFade inView delay={i * 0.2}>
                    <button className="hover:bg-limeneon/10 p-4 rounded-lg transition-colors cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#A3FF12"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </BlurFade>
                )}
                <BlurFade inView delay={i * 0.2}>
                  <button className="hover:bg-electric/10 p-4 rounded-lg transition-colors cursor-pointer" onClick={}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FF3CAC"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </BlurFade>
              </td> */}
            </tr>
          ))}
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
      </tbody>
    </table>
  );
}
