import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, before, after } = body;

    const contacts = await prisma.contact.updateMany({
      where: {
        contactPath: before,
      },
      data: {
        contactPath: after,
      },
    });

    return NextResponse.json({ message: "ok" });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}
