import prisma from "@/libs/prismadb";

export interface IContactParams {
  pm?: string;
  state?: string;
  term?: string;
  startDate?: string;
  endDate?: string;
}

export default async (params: IContactParams) => {
  try {
    const { pm, state, term, startDate, endDate } = params;

    let query: any = {};

    if (pm) {
      query.pm = pm;
    }
    if (state) {
      query.state = state;
    }

    if (term) {
      query.OR = [
        {
          clientCompany: { contains: term },
        },
        {
          OR: [
            { client: { some: { phone: { contains: term } } } },
            { client: { some: { name: { contains: term } } } },
          ],
        },
        {
          description: { contains: term },
        },
        {
          note: { contains: term },
        },
      ];
    }

    if (startDate && endDate) {
      query.AND = [
        { createdAt: { gte: startDate } },
        { createdAt: { lte: endDate } },
      ];
    }

    const contacts = await prisma.contact.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        client: true,
      },
    });

    return contacts;
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    throw new Error(error);
  }
};
