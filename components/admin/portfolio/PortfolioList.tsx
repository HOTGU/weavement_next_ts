import React from "react";
import PortfolioBlock from "./PortfolioBlock";
import PortfolioPagination from "@/components/portfolio/PortfolioPagination";
import { Portfolio } from "@prisma/client";

const PortfolioList = ({
  portfolios,
  allPage,
  currentPage,
}: {
  portfolios: Portfolio[];
  allPage: number;
  currentPage: number | undefined;
}) => {
  return (
    <div className="w-full md:w-1/2 mx-auto py-4 h-full max-h-[400px] sm:max-h-[calc(100vh-50px)] pb-4 ">
      <div className="border rounded sm:max-h-[calc(100vh-82px)] flex flex-col ">
        <div className="h-full overflow-y-auto">
          {portfolios.map((portfolio) => (
            <PortfolioBlock portfolio={portfolio} key={portfolio.id} />
          ))}
        </div>
        <PortfolioPagination allPage={allPage} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default PortfolioList;
