import React from "react";

import getPortfolios, { IPortfolioParams } from "@/actions/db/getPortfolios";

import Container from "@/components/Container";
import PortfolioClient from "@/components/admin/portfolio/PortfolioClient";

interface PortfolioProps {
  searchParams: IPortfolioParams;
}

const PortfolioPage = async ({ searchParams }: PortfolioProps) => {
  const params = { ...searchParams, take: 20 };
  const { portfolios, allPage } = await getPortfolios(params);

  return (
    <Container>
      <PortfolioClient
        portfolios={portfolios}
        allPage={allPage}
        currentPage={searchParams.page}
      />
    </Container>
  );
};

export default PortfolioPage;
