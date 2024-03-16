import { NextResponse } from "next/server";
import qs from "query-string";

import prisma from "@/libs/prismadb";
import { addDays } from "date-fns";

const TAKE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = qs.parse(searchParams.toString());
  try {
    const { pm, state, term, startDate, endDate, skip } = params;

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
        { createdAt: { gte: new Date(startDate as string) } },
        { createdAt: { lte: addDays(new Date(endDate as string), 1) } },
      ];
    }

    const contacts = await prisma.contact.findMany({
      where: query,
      take: TAKE,
      skip: Number(skip),

      orderBy: {
        createdAt: "desc",
      },
      include: {
        client: true,
      },
    });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    return new NextResponse("서버 오류발생", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, email, position, files, ...contactBody } = body;
    const clientBody = { name, phone, email, position };

    const contact = await prisma.contact.create({
      data: {
        ...contactBody,
        client: {
          create: [
            {
              ...clientBody,
            },
          ],
        },
      },
    });
    return NextResponse.json(contact);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}
