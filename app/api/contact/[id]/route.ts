import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  id: string;
}

export async function PUT(
  request: NextRequest,
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

    const body = await request.json();

    if (body.state === "문의" && body.pm && body.pm !== "미정") {
      body.state = "상담";
    }

    const updatedContact = await prisma.contact.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
      include: { client: true },
    });

    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return NextResponse.json({ message: "서버 오류발생" }, { status: 500 });
  }
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

    await prisma.contact.delete({
      where: { id },
      include: { client: true },
    });

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return NextResponse.json({ message: "서버 오류발생" }, { status: 500 });
  }
}
