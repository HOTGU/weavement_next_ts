import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  id: string;
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

    if (!currentUser.isAdmin || currentUser.admin_id !== process.env.MASTER_ID)
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

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return NextResponse.json({ message: "서버 오류발생" }, { status: 500 });
  }
}
