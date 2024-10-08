import React from "react";

import getPortfolios from "@/actions/db/getPortfolios";
import { IPortfolioParams } from "@/actions/db/getPortfolios";
import Container from "@/components/Container";
import PortfolioBlock from "@/components/screens/portfolio/PortfolioBlock";
import PortfolioPagination from "@/components/screens/portfolio/PortfolioPagination";
import metadataConfig from "@/constants/metadataConfig";

export const metadata = metadataConfig.portfolioMetadata;

interface PortfolioParams {
  searchParams: IPortfolioParams;
}

const PortfolioPage = async ({ searchParams }: PortfolioParams) => {
  const { portfolios, allPage } = await getPortfolios(searchParams);

  return (
    <Container>
      <div className="min-h-[calc(100vh-100px)] flex flex-col">
        <div className="flex-1 grid gird-cols-1 md:grid-cols-2 gap-6">
          {portfolios.map((portfolio) => (
            <PortfolioBlock portfolio={portfolio} key={portfolio.id} />
          ))}
        </div>
        <PortfolioPagination
          allPage={allPage}
          currentPage={searchParams.page}
        />
      </div>
    </Container>
  );
};

export default PortfolioPage;
