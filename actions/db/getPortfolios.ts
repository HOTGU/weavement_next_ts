import prisma from "@/libs/prismadb";

export interface IPortfolioParams {
  term?: string;
  page?: number;
}

export default async ({ term, page }: IPortfolioParams) => {
  try {
    const TAKE = 10;
    let SKIP = 0;
    if (page) {
      SKIP = TAKE * (page - 1);
    }
    const allPortfolios = await prisma.portfolio.count();
    const portfolios = await prisma.portfolio.findMany({
      take: TAKE,
      skip: SKIP,
    });

    const PAGE = Math.ceil(allPortfolios / TAKE);

    return { portfolios, allPage: PAGE };
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    throw new Error(error);
  }
};
