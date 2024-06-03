import React from "react";
import { Metadata } from "next";
import Image from "next/legacy/image";

import getPortfolio, { IParams } from "@/actions/db/getPortfolio";
import getPortfolios from "@/actions/db/getPortfolios";
import Container from "@/components/Container";
import metadataConfig from "@/constants/metadataConfig";
import prisma from "@/libs/prismadb";

export const generateMetadata = async ({
  params,
}: {
  params: IParams;
}): Promise<Metadata> => {
  const { id } = params;
  const portfolio = await getPortfolio({ id });

  if (!portfolio) {
    return metadataConfig.defaultPortfolioDetailMetadata;
  }

  return {
    title: `위브먼트 | ${portfolio.metaTitle}`,
    description: portfolio.metaDescription,
    icons: {
      icon: "/favicon.png",
    },
    keywords: portfolio.metaKeywords,
    alternates: {
      canonical: `https://weavement.co.kr/portfolio/${portfolio.id}`,
    },
    openGraph: {
      title: `위브먼트 | ${portfolio.metaTitle}`,
      // @ts-ignore
      description: portfolio.metaDescription,
      locale: "ko_KR",
      // @ts-ignore
      type: "website",
      siteName: "위브먼트",
      url: `https://weavement.co.kr/portfolio/${portfolio.id}`,
      images: [
        {
          url: "/meta_img.png",
        },
      ],
    },
  };
};

export const generateStaticParams = async () => {
  // const { portfolios } = await getPortfolios({});

  const portfolios = await prisma.portfolio.findMany({});

  return portfolios.map((portfolio) => ({
    id: String(portfolio.id),
  }));
};

const page = async ({ params }: { params: IParams }) => {
  const { id } = params;
  const portfolio = await getPortfolio({ id });

  if (!portfolio) return <></>;

  return (
    <Container>
      <div className="py-8">
        <div className=" flex flex-col items-center gap-6 md:gap-8 lg:gap-10 xl:gap-24 py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10">
          <div className="w-full aspect-video relative">
            <Image
              src={portfolio?.thumb}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
              sizes="100vw"
              alt="포트폴리오 썸네일"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-4 xl:gap-6 items-center justify-center">
            <div className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold">
              {portfolio.title}
            </div>
            <div className="text-sm md:text-md lg:text-lg whitespace-pre-wrap text-center">
              {portfolio.description}
            </div>
          </div>
          <div className="columns-2 lg:columns-3">
            {portfolio.images.map((image, index) => (
              <img
                alt="포트폴리오 사진"
                src={image}
                key={index}
                className="mb-6 rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
