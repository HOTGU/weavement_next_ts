"use client";

import { Portfolio } from "@prisma/client";
import React from "react";

import PortfolioUpload from "./PortfolioUpload";
import PortfolioBlock from "./PortfolioBlock";
import useUpdatePortfolio from "@/hooks/useUpdatePortfolio";
import PortfolioUpdate from "./PortfolioUpdate";
import PortfolioPagination from "@/components/portfolio/PortfolioPagination";

interface PortfolioClientProps {
  portfolios: Portfolio[];
  allPage: number;
  currentPage?: number;
}

const PortfolioClient = ({
  portfolios,
  allPage,
  currentPage,
}: PortfolioClientProps) => {
  const updatePortfolio = useUpdatePortfolio();

  return (
    <div className="flex h-[calc(100vh-50px)] gap-8">
      <div className="w-1/3 h-full py-6 flex flex-col border rounded">
        <div className="h-full">
          {portfolios.map((portfolio) => (
            <PortfolioBlock portfolio={portfolio} key={portfolio.id} />
          ))}
        </div>
        <PortfolioPagination allPage={allPage} currentPage={currentPage} />
      </div>
      <div className="w-2/3 h-full border rounded">
        {updatePortfolio.isUpdate ? <PortfolioUpdate /> : <PortfolioUpload />}
      </div>
    </div>
  );
};

export default PortfolioClient;
