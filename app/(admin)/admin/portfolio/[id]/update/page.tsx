import React from "react";
import getPortfolio, { IParams } from "@/actions/db/getPortfolio";
import PortfolioUpdate from "@/components/admin/portfolio/PortfolioUpdate";
import Container from "@/components/Container";

const PortfolioUpdatePage = async ({ params }: { params: IParams }) => {
  const { id } = params;
  const portfolio = await getPortfolio({ id });

  if (portfolio === null) return null;

  return (
    <Container>
      <PortfolioUpdate portfolio={portfolio} />;
    </Container>
  );
};

export default PortfolioUpdatePage;
