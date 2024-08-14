import React from "react";
import { Metadata } from "next";
import { Portfolio } from "@prisma/client";

import getPortfolio, { IParams } from "@/actions/db/getPortfolio";
import Container from "@/components/Container";
import metadataConfig from "@/constants/metadataConfig";
import prisma from "@/libs/prismadb";
import PortfolioDetail from "@/components/screens/portfolio/PortfolioDetail";
import { SameCategoryPortfolioData } from "@/types";
import SameCategoryPortfolio from "@/components/screens/portfolio/SameCategoryPortfolio";

type Data = {
  portfolio: Portfolio;

  sameCategoryPortfolioData: SameCategoryPortfolioData;
};

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
  const portfolios = await prisma.portfolio.findMany({});

  return portfolios.map((portfolio) => ({
    id: String(portfolio.id),
  }));
};

const getPortfolioDetail = async ({ id }: { id: string }) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({ where: { id } });

    const category = portfolio?.category;

    let data = {
      portfolio,
      sameCategoryPortfolioData: category?.map((c) => {
        return {
          name: c,
          data: [],
        };
      }),
    } as Data;

    if (category && category.length > 0) {
      for (let i = 0; i < category.length; i++) {
        const nextPortfolios = await prisma.portfolio.findMany({
          where: {
            category: {
              has: category[i],
            },
          },
          take: 1,
          skip: 1,
          orderBy: {
            createdAt: "desc",
          },
          cursor: { id },
        });
        const prevPortfolios = await prisma.portfolio.findMany({
          where: {
            category: {
              has: category[i],
            },
          },
          take: -1,
          skip: 1,
          orderBy: {
            createdAt: "desc",
          },
          cursor: { id },
        });

        data.sameCategoryPortfolioData[i].name = category[i];
        data.sameCategoryPortfolioData[i].next = nextPortfolios[0];
        data.sameCategoryPortfolioData[i].prev = prevPortfolios[0];
      }
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }: { params: IParams }) => {
  const { id } = params;
  const data = await getPortfolioDetail({ id });

  if (!data) return <></>;

  const { portfolio, sameCategoryPortfolioData } = data;

  return (
    <Container>
      <PortfolioDetail portfolio={portfolio} />
      <SameCategoryPortfolio sameCategoryData={sameCategoryPortfolioData} />
    </Container>
  );
};

export default page;
