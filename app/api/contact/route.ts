import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const contacts = await prisma.contact.findMany({
      include: { client: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
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
