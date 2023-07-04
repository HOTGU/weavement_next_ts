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
    <div className="flex flex-col sm:flex-row h-full sm:h-[calc(100vh-50px)] gap-8">
      <div className="w-full md:w-1/3 h-full max-h-[400px] sm:h-full sm:max-h-full overflow-y-auto py-6 flex flex-col border rounded">
        <div className="h-full">
          {portfolios.map((portfolio) => (
            <PortfolioBlock portfolio={portfolio} key={portfolio.id} />
          ))}
        </div>
        <PortfolioPagination allPage={allPage} currentPage={currentPage} />
      </div>
      <div className="hidden sm:block w-full sm:w-2/3 h-full border rounded">
        {updatePortfolio.isUpdate ? <PortfolioUpdate /> : <PortfolioUpload />}
      </div>
    </div>
  );
};

export default PortfolioClient;
