import React from "react";
import { Metadata } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import { Portfolio } from "@prisma/client";

import getPortfolio, { IParams } from "@/actions/db/getPortfolio";
import Container from "@/components/Container";
import metadataConfig from "@/constants/metadataConfig";
import prisma from "@/libs/prismadb";
import PortfolioBlock from "@/components/portfolio/PortfolioBlock";

type Data = {
  portfolio: Portfolio;

  samCategoryData: { name: string; next?: Portfolio; prev?: Portfolio }[];
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
      samCategoryData: category?.map((c) => {
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

        data.samCategoryData[i].name = category[i];
        data.samCategoryData[i].next = nextPortfolios[0];
        data.samCategoryData[i].prev = prevPortfolios[0];
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

  const { portfolio, samCategoryData } = data;

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
              alt="포트폴리오 대표사진"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-4 xl:gap-6 items-center justify-center">
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold">
              {portfolio.title}
            </h2>
            {portfolio.category.length > 0 && (
              <div className="flex gap-4">
                {portfolio.category.map((category) => (
                  <div
                    className="inline-block px-2 py-1 rounded bg-neutral-200 text-xs md:text-sm lg:text-base"
                    key={category}
                  >
                    #{category}
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm md:text-md lg:text-lg whitespace-pre-wrap text-center">
              {portfolio.description}
            </p>
          </div>
          <div className="columns-2 lg:columns-3">
            {portfolio.images.map((image, index) => (
              <img
                alt={`포트폴리오 사진 ${index}`}
                src={image}
                key={index}
                className="mb-6 rounded"
              />
            ))}
          </div>
        </div>
        <hr />
        <div>
          {samCategoryData.map((data) => {
            return (
              <>
                {(data.prev || data.next) && (
                  <div className="py-4" key={data.name}>
                    <div className=" text-neutral-500 text-sm sm:text-base md:text-lg lg:text-xl pb-2">
                      다른 #{data.name} 사례
                    </div>
                    <div className="flex items-center gap-4 w-full">
                      {data.prev && (
                        <Link
                          href={`/portfolio/${data.prev.id}`}
                          className="flex items-center gap-2 w-1/2"
                        >
                          <div className="relative w-full aspect-video overflow-hidden">
                            <PortfolioBlock portfolio={data.prev} />
                          </div>
                        </Link>
                      )}

                      {data.next && (
                        <Link
                          href={`/portfolio/${data.next.id}`}
                          className="flex items-center gap-2 w-1/2"
                        >
                          <div className="relative w-full aspect-video overflow-hidden">
                            <PortfolioBlock portfolio={data.next} />
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default page;
