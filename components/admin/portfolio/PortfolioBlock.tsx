"use client";

import useDeletePortfolioConfirm from "@/hooks/useDeletePortfolioConfirm";
import useUpdatePortfolio from "@/hooks/useUpdatePortfolio";
import { Portfolio } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface PortfolioBlockProps {
  portfolio: Portfolio;
}

const PortfolioBlock = ({ portfolio }: PortfolioBlockProps) => {
  const updatePortfolio = useUpdatePortfolio();
  const deletePortfolioConfirm = useDeletePortfolioConfirm();

  const isMatch = updatePortfolio.target === portfolio;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        isMatch && "bg-neutral-200 "
      }`}
    >
      <Link
        href={`/portfolio/${portfolio.id}`}
        target="_blank"
        className="text-xl font-bold flex-1 hover:underline truncate"
      >
        {portfolio.title}
      </Link>
      <div className="flex gap-2 text-sm">
        <div
          className={`${
            isMatch ? "bg-blue-800" : "bg-blue-400"
          } text-white px-2 py-1 rounded hover:opacity-70 transition cursor-pointer`}
          onClick={() =>
            isMatch
              ? updatePortfolio.onClose()
              : updatePortfolio.onUpdate(portfolio)
          }
        >
          {isMatch ? "취소" : "수정"}
        </div>
        <div
          className="bg-red-400 text-white px-2 py-1 rounded hover:opacity-70 transition cursor-pointer"
          onClick={() => deletePortfolioConfirm.onOpen(portfolio.id)}
        >
          삭제
        </div>
      </div>
    </div>
  );
};

export default PortfolioBlock;
