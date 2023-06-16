import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    if (!currentUser.isAdmin) return NextResponse.error();

    const body = await request.json();
    const { contactId, ...clientBody } = body;

    if (!contactId || typeof contactId !== "string")
      throw new Error("invalid ID");

    const contact = await prisma.contact.update({
      where: { id: contactId },
      data: {
        client: {
          create: [{ ...clientBody }],
        },
      },
      include: { client: true },
    });

    return NextResponse.json(contact);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}
