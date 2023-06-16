import getPortfolio, { IParams } from "@/actions/db/getPortfolio";
import getPortfolios from "@/actions/db/getPortfolios";
import Container from "@/components/Container";
import Image from "next/legacy/image";
import React from "react";

export async function generateStaticParams() {
  const { portfolios } = await getPortfolios({});

  return portfolios.map((portfolio) => ({
    id: String(portfolio.id),
  }));
}

const page = async ({ params }: { params: IParams }) => {
  const { id } = params;
  const portfolio = await getPortfolio({ id });

  if (!portfolio) return <></>;

  return (
    <Container>
      <div className="py-16">
        <div className=" flex flex-col items-center gap-6 md:gap-8 lg:gap-10 xl:gap-24 py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10">
          <div className="w-full aspect-video relative">
            <Image
              src={portfolio?.thumb}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-4 xl:gap-6 items-center justify-center">
            <div className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold">
              {portfolio.title}
            </div>
            <div className="text-sm md:text-md lg:text-lg whitespace-pre-wrap">
              {portfolio.description}
            </div>
          </div>
          <div className="columns-2 lg:columns-3">
            {portfolio.images.map((image, index) => (
              <img src={image} key={index} className="mb-6 rounded" />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
