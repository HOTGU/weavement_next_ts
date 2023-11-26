import prisma from "@/libs/prismadb";

interface IAnalysisParams {
  year: number;
}

export default async (params: IAnalysisParams) => {
  const { year } = params;
  try {
    const total = await prisma.contact.count({
      where: {
        AND: [
          { createdAt: { gte: new Date(Date.UTC(year, 1, 1)) } },
          { createdAt: { lte: new Date(year, 12, 31) } },
        ],
      },
    });
    const success = await prisma.contact.count({
      where: {
        AND: [
          { createdAt: { gte: new Date(Date.UTC(year, 1, 1)) } },
          { createdAt: { lte: new Date(year, 12, 31) } },
          { OR: [{ state: "계약" }, { state: "완료" }] },
        ],
      },
    });
    const fail = total - success;
    const data = {
      total,
      labels: ["불발", "계약"],
      series: [fail, success],
      colors: ["#f95151", "#1B9CFC"],
    };
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return null;
  }
};
