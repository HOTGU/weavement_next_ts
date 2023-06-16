import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();
    if (!currentUser.isAdmin) return NextResponse.error();

    const { id } = params;

    if (!id || typeof id !== "string") return new Error("Invalid ID");

    const body = await request.json();

    const updatedContact = await prisma.contact.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
      include: { client: true },
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();
    if (!currentUser.isAdmin) return NextResponse.error();

    const { id } = params;

    if (!id || typeof id !== "string") return new Error("Invalid ID");

    await prisma.contact.delete({
      where: { id },
      include: { client: true },
    });

    return NextResponse.json({ message: "ok" });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}
