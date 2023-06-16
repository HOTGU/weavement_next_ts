import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    if (!currentUser.isAdmin) return NextResponse.error();

    const { id } = params;

    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID");
    }

    const client = await prisma.client.delete({ where: { id } });

    const contact = await prisma.contact.findUnique({
      where: { id: client.contactId },
      include: { client: true },
    });

    return NextResponse.json(contact);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버오류 발생", { status: 500 });
  }
}
