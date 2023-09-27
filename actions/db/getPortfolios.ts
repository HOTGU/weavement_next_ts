import prisma from "@/libs/prismadb";

export interface IPortfolioParams {
  isRep?: boolean;
  page?: number;
}

export default async ({ isRep = false, page }: IPortfolioParams) => {
  try {
    const TAKE = 8;
    let SKIP = 0;
    const query: any = {};
    if (page) {
      SKIP = TAKE * (page - 1);
    }
    if (isRep) {
      query.isRep = true;
    }
    const allPortfolios = await prisma.portfolio.count();
    const portfolios = await prisma.portfolio.findMany({
      where: query,
      take: TAKE,
      skip: SKIP,
    });

    const PAGE = Math.ceil(allPortfolios / TAKE);

    portfolios.reverse(); // 최신순 order by

    return { portfolios, allPage: PAGE };
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    throw new Error(error);
  }
};
