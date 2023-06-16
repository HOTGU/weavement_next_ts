import prisma from "@/libs/prismadb";

export interface IParams {
  id: string;
}

export default async ({ id }: IParams) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({ where: { id } });
    return portfolio;
  } catch (error) {
    return null;
  }
};
