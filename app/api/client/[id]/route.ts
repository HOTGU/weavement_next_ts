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

    if (!currentUser)
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    if (!currentUser.isAdmin)
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    const { id } = params;

    if (!id || typeof id !== "string")
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

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
    return NextResponse.json("클라이언트 삭제 중 서버오류 발생", {
      status: 500,
    });
  }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    if (!currentUser.isAdmin)
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    const { id } = params;

    if (!id || typeof id !== "string")
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    const body = await request.json();

    const updateClient = await prisma.client.update({
      where: { id },
      data: { ...body },
    });

    const contact = await prisma.contact.findUnique({
      where: { id: updateClient.contactId },
      include: {
        client: true,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json("클라이언트 수정 중 서버에러 발생", {
      status: 500,
    });
  }
}
