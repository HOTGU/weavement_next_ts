import prisma from "@/libs/prismadb";

export interface IPortfolioParams {
  isRep?: boolean;
  page?: number;
  take?: number;
  term?: string;
  category?: string;
}

export default async ({
  isRep = false,
  page,
  take = 10,
  term,
  category,
}: IPortfolioParams) => {
  try {
    let skip = 0;
    const query: any = {};

    if (page) {
      skip = take * (page - 1);
    }
    if (isRep) {
      query.isRep = true;
    }
    if (term) {
      query.title = { contains: term };
    }
    if (category) {
      query.category = { has: category };
    }
    const allPortfolios = await prisma.portfolio.count({ where: query });
    const portfolios = await prisma.portfolio.findMany({
      where: query,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    const PAGE = Math.ceil(allPortfolios / take);

    return { portfolios, allPage: PAGE };
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    throw new Error(error);
  }
};
